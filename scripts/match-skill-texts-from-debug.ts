#!/usr/bin/env tsx

import fs from 'node:fs/promises';
import path from 'node:path';

import { readTextInScreen, terminateOcrWorkers, type TextOcrOptions } from '../src/ocr.js';
import { matFromBuffer, type Rect, type ScreenCapture } from '../src/needle.js';
import {
  bestSkillTextCatalogMatch,
  isReliableSkillTextCatalogMatch,
  loadSkillTextCatalog,
  type SkillCatalogRarity,
  type SkillTextCatalogEntry,
  type SkillTextCatalogMatch,
} from '../src/skill-text-catalog.js';

interface Options {
  catalogPath: string;
  debugDir: string;
  json: boolean;
  limit?: number;
  writePath?: string;
}

interface DebugSkillNumberRead {
  index: number;
  number?: number;
  rawNumber: string;
}

interface DebugSkillFrame {
  frame: string;
  numberReads: DebugSkillNumberRead[];
  selectedRarity?: string;
}

interface HarvestedSkillTextMatch {
  catalogIndex: number;
  frame: string;
  matchedRarity: SkillCatalogRarity;
  matchedText: string;
  ocrText: string;
  score: number;
  skillNumber: number;
  slot: number;
}

interface HarvestedSkillTextMatchFile {
  generatedAt: string;
  matches: Record<string, HarvestedSkillTextMatch>;
}

const DEFAULT_CATALOG_PATH = 'obsidian-knight/skill-text-catalog.txt';
const DEFAULT_DEBUG_DIR = 'debug/skill-rarity-screenshots';
const DEFAULT_WRITE_PATH = 'debug/skill-text-number-matches-from-debug.json';
const MIN_MATCH_MARGIN = 0.04;
const MIN_MATCH_SCORE = 0.62;

const SKILL_TEXT_RECTS_IN_SCREENSHOT: Rect[] = [
  { x: 350, y: 390, w: 260, h: 120 },
  { x: 720, y: 390, w: 260, h: 120 },
  { x: 1090, y: 390, w: 260, h: 120 },
];

const SKILL_TEXT_OCR_FALLBACK_OPTIONS: TextOcrOptions[] = [
  { scale: 3, threshold: false },
  { scale: 4, threshold: false },
  { scale: 4, threshold: 160 },
  { scale: 5, threshold: 170 },
];

function usage(): string {
  return [
    'Usage:',
    '  node dist/scripts/match-skill-texts-from-debug.js [options]',
    '',
    'Options:',
    `  --catalog <path>   Skill text catalog. Default: ${DEFAULT_CATALOG_PATH}`,
    `  --debug-dir <dir>  Debug screenshots directory. Default: ${DEFAULT_DEBUG_DIR}`,
    '  --limit <number>   Process only the first N frames',
    `  --write [path]     Write consolidated map. Default: ${DEFAULT_WRITE_PATH}`,
    '  --json             Print JSON instead of a table',
    '  --help             Show this help',
  ].join('\n');
}

function flagValue(
  argv: readonly string[],
  index: number,
  flag: string,
  inlineValue?: string,
): { nextIndex: number; value: string } {
  if (inlineValue !== undefined) {
    return { nextIndex: index, value: inlineValue };
  }

  const value = argv[index + 1];
  if (value === undefined || value.startsWith('--')) {
    throw new Error(`${flag} needs a value`);
  }

  return { nextIndex: index + 1, value };
}

function parseInteger(value: string, flag: string): number {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`${flag} must be a positive integer`);
  }

  return parsed;
}

function parseArgs(argv: readonly string[]): Options | 'help' {
  const options: Options = {
    catalogPath: DEFAULT_CATALOG_PATH,
    debugDir: DEFAULT_DEBUG_DIR,
    json: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === undefined) {
      continue;
    }

    const equalsIndex = arg.indexOf('=');
    const flag = equalsIndex === -1 ? arg : arg.slice(0, equalsIndex);
    const inlineValue = equalsIndex === -1 ? undefined : arg.slice(equalsIndex + 1);

    switch (flag) {
      case '--help':
      case '-h':
        return 'help';

      case '--catalog': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.catalogPath = result.value;
        index = result.nextIndex;
        break;
      }

      case '--debug-dir': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.debugDir = result.value;
        index = result.nextIndex;
        break;
      }

      case '--limit': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.limit = parseInteger(result.value, flag);
        index = result.nextIndex;
        break;
      }

      case '--write': {
        if (inlineValue !== undefined) {
          options.writePath = inlineValue;
        } else if (argv[index + 1] !== undefined && !argv[index + 1]!.startsWith('--')) {
          options.writePath = argv[index + 1];
          index += 1;
        } else {
          options.writePath = DEFAULT_WRITE_PATH;
        }
        break;
      }

      case '--json':
        options.json = true;
        break;

      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }

  return options;
}

async function findDebugMatchFiles(debugDir: string): Promise<string[]> {
  const entries = await fs.readdir(debugDir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const frameDir = path.join(debugDir, entry.name);
    const frameFiles = await fs.readdir(frameDir);
    files.push(
      ...frameFiles
        .filter((file) => file.endsWith('_matches.json'))
        .map((file) => path.join(frameDir, file)),
    );
  }

  return files.sort();
}

function parseRarity(value: string | undefined): SkillCatalogRarity | undefined {
  const rarity = value?.replace(/\.[^.]+$/, '').toLowerCase();
  if (rarity === 'common' || rarity === 'rare' || rarity === 'epic') {
    return rarity;
  }

  return;
}

async function readDebugFrame(matchFile: string): Promise<DebugSkillFrame> {
  return JSON.parse(await fs.readFile(matchFile, 'utf8')) as DebugSkillFrame;
}

function annotatedScreenshotPath(matchFile: string, frame: string): string {
  return path.join(path.dirname(matchFile), `${frame}_annotated.png`);
}

async function loadScreenshotAsScreen(imagePath: string): Promise<ScreenCapture> {
  const { canvas, mat } = await matFromBuffer(await fs.readFile(imagePath));
  return {
    canvas,
    gray: mat,
    x: 0,
    y: 0,
    release: () => {
      mat.delete();
    },
  };
}

async function readBestTextMatch(
  screen: ScreenCapture,
  rect: Rect,
  rarity: SkillCatalogRarity | undefined,
  catalog: readonly SkillTextCatalogEntry[],
): Promise<{ match?: SkillTextCatalogMatch; ocrText: string }> {
  const attempts = [];

  for (const options of SKILL_TEXT_OCR_FALLBACK_OPTIONS) {
    const ocrText = await readTextInScreen(screen, rect, options);
    const match = bestSkillTextCatalogMatch(ocrText, catalog, { rarity });
    attempts.push({ match, ocrText });

    if (isReliableSkillTextCatalogMatch(match, MIN_MATCH_SCORE, MIN_MATCH_MARGIN)) {
      return { match, ocrText };
    }
  }

  const [bestAttempt] = attempts.sort((left, right) => {
    return (right.match?.score ?? 0) - (left.match?.score ?? 0);
  });

  return {
    match: bestAttempt?.match,
    ocrText: bestAttempt?.ocrText ?? '',
  };
}

async function harvestFrame(
  matchFile: string,
  catalog: readonly SkillTextCatalogEntry[],
): Promise<HarvestedSkillTextMatch[]> {
  const frame = await readDebugFrame(matchFile);
  const rarity = parseRarity(frame.selectedRarity);
  const screen = await loadScreenshotAsScreen(annotatedScreenshotPath(matchFile, frame.frame));

  try {
    const rows: HarvestedSkillTextMatch[] = [];
    for (const numberRead of frame.numberReads) {
      if (numberRead.number === undefined) {
        continue;
      }

      const rect = SKILL_TEXT_RECTS_IN_SCREENSHOT[numberRead.index - 1];
      if (!rect) {
        continue;
      }

      const { match, ocrText } = await readBestTextMatch(screen, rect, rarity, catalog);
      if (!isReliableSkillTextCatalogMatch(match, MIN_MATCH_SCORE, MIN_MATCH_MARGIN)) {
        continue;
      }

      rows.push({
        catalogIndex: match.entry.index,
        frame: frame.frame,
        matchedRarity: match.entry.rarity,
        matchedText: match.entry.text,
        ocrText,
        score: match.score,
        skillNumber: numberRead.number,
        slot: numberRead.index,
      });
    }

    return rows;
  } finally {
    screen.release();
  }
}

function consolidate(rows: readonly HarvestedSkillTextMatch[]): HarvestedSkillTextMatchFile {
  const matches: Record<string, HarvestedSkillTextMatch> = {};

  for (const row of rows) {
    const key = String(row.skillNumber);
    const existing = matches[key];
    if (!existing || row.score > existing.score) {
      matches[key] = row;
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    matches,
  };
}

function renderTable(rows: readonly HarvestedSkillTextMatch[]): string {
  const lines = [
    [
      'skill'.padStart(5),
      'score'.padStart(6),
      'catalog'.padStart(7),
      'rarity'.padEnd(6),
      'text',
    ].join('  '),
  ];

  for (const row of rows) {
    lines.push(
      [
        String(row.skillNumber).padStart(5),
        row.score.toFixed(3).padStart(6),
        String(row.catalogIndex + 1).padStart(7),
        row.matchedRarity.padEnd(6),
        row.matchedText,
      ].join('  '),
    );
  }

  return lines.join('\n');
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  if (options === 'help') {
    console.log(usage());
    return;
  }

  const catalog = await loadSkillTextCatalog(options.catalogPath);
  const matchFiles = (await findDebugMatchFiles(options.debugDir)).slice(0, options.limit);
  const rows = (
    await Promise.all(matchFiles.map((matchFile) => harvestFrame(matchFile, catalog)))
  ).flat();
  const result = consolidate(rows);
  const values = Object.values(result.matches).sort((left, right) => {
    return left.skillNumber - right.skillNumber;
  });

  if (options.writePath !== undefined) {
    await fs.mkdir(path.dirname(options.writePath), { recursive: true });
    await fs.writeFile(options.writePath, JSON.stringify(result, null, 2));
  }

  console.log(options.json ? JSON.stringify(result, null, 2) : renderTable(values));
}

try {
  await main();
  await terminateOcrWorkers();
} catch (error) {
  await terminateOcrWorkers().catch(() => undefined);
  console.error(error instanceof Error ? error.message : error);
  console.error('');
  console.error(usage());
  process.exitCode = 1;
}
