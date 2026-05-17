/*
npx tsx ./src/main.ts
*/

import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createCanvas, type Canvas } from 'canvas';

import { NEEDLE_NAME_BY_KEY, type NeedleKey } from './generated/needle-names.js';
import { NEEDLE_GROUPS } from './needle-groups.js';
import { readNumberInFound, readTextInFound } from './ocr.js';
import {
  captureScreen,
  clickFound,
  clickScreenPoint,
  findAllInScreen,
  loadNeedle,
  loadNeedlesByNameFromDir,
  type FindRes,
  type Needle,
  type NeedleSettings,
  type Rect,
  type ScreenCapture,
} from './needle.js';
import {
  bestSkillChoice,
  buildSkillChoices,
  findSkillChoiceSlots,
  formatSkillChoices,
  loadSkillWeights,
  readSkillChoiceSlots,
  type ScreenPoint,
  type SkillChoiceLocator,
  type SkillWeights,
} from './skill-picker.js';

const NEEDLE_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles_dung';
const SKILL_NEEDLE_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles';
const DEBUG_NUMBER_OCR_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/number-ocr';
const DEBUG_SKILL_RARITY_SCREENSHOTS_DIR =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/skill-rarity-screenshots';
const SKILL_WEIGHTS_CONFIG_PATH =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/skill-weights.json';

const SCREENSHOT_INTERVAL_MS = 1000;
const SCREEN_REGION: Rect = { x: 552, y: 210, w: 2400, h: 1092 };

const READ_TEXT = false;
const READ_NUMBER = true;
const DEBUG_NUMBER_OCR = false;
const DEBUG_NUMBER_NEEDLE = 'skill_number_rare.png';
const DEBUG_SKILL_RARITY_SCREENSHOTS = true;
const DEBUG_SKILL_RARITY_MAX_SCREENSHOTS = 100;
const SKILL_NUMBER_NEEDLE_KEYS = new Set<NeedleKey>(NEEDLE_GROUPS.skillNumbers);
const ACTIVE_NEEDLES = NEEDLE_GROUPS.all.filter((name) => !SKILL_NUMBER_NEEDLE_KEYS.has(name));

interface SkillChoiceLocatorConfig {
  path: string;
  numberRect: Rect;
  clickOffset?: ScreenPoint;
  settings: NeedleSettings;
}

const SKILL_NUMBER_OCR_RECT: Rect = { x: 60, y: 10, w: 100, h: 55 };
const SKILL_NUMBER_MASK_IGNORE_RECTS: Rect[] = [SKILL_NUMBER_OCR_RECT];
const SKILL_NUMBER_LOCATOR_SETTINGS: NeedleSettings = {
  matchThreshold: 0.97,
  maxResults: 3,
  overlapThreshold: 0.5,
  maskIgnoreRects: SKILL_NUMBER_MASK_IGNORE_RECTS,
};

const SKILL_CHOICE_LOCATOR_CONFIGS: SkillChoiceLocatorConfig[] = [
  {
    path: path.join(SKILL_NEEDLE_DIR, 'skill_number_common.png'),
    numberRect: SKILL_NUMBER_OCR_RECT,
    settings: SKILL_NUMBER_LOCATOR_SETTINGS,
  },
  {
    path: path.join(NEEDLE_DIR, 'skill_number_rare.png'),
    numberRect: SKILL_NUMBER_OCR_RECT,
    settings: SKILL_NUMBER_LOCATOR_SETTINGS,
  },
  {
    path: path.join(SKILL_NEEDLE_DIR, 'skill_number_epic.png'),
    numberRect: SKILL_NUMBER_OCR_RECT,
    settings: SKILL_NUMBER_LOCATOR_SETTINGS,
  },
];

const DEBUG_SKILL_RARITY_NEEDLE_FILES = ['common.png', 'rare.png', 'epic.png'] as const;
const DEBUG_SKILL_RARITY_NEEDLE_SETTINGS: NeedleSettings = {
  matchThreshold: 0.9,
  maxResults: 10,
  overlapThreshold: 0.5,
};

const REROLL_NEEDLE_PATH = path.join(NEEDLE_DIR, 'reroll.png');
const REROLL_NEEDLE_SETTINGS: NeedleSettings = { matchThreshold: 0.9, maxResults: 1 };
const SKILL_CHOICE_OCR_OPTIONS = { scale: 5, threshold: false } as const;

let debugFrameCounter = 0;
let debugSkillRarityScreenshotCount = 0;

function needleDisplayName(needleName: string): string {
  return needleName.replace(/\.[^.]+$/, '');
}

function isSkillNumberNeedle(needleName: string): boolean {
  return needleName.startsWith('skill_number_');
}

function isDebugNumberNeedle(needleName: string): boolean {
  return needleName === DEBUG_NUMBER_NEEDLE;
}

function shouldReadNumber(needleName: string): boolean {
  return READ_NUMBER && isSkillNumberNeedle(needleName);
}

function frameDebugName(startedAt: number): string {
  const timestamp = debugTimestamp(startedAt);
  debugFrameCounter += 1;
  return `${timestamp}_${String(debugFrameCounter).padStart(5, '0')}`;
}

function debugTimestamp(dateMs = Date.now()): string {
  const date = new Date(dateMs);
  const pad = (value: number, size = 2) => String(value).padStart(size, '0');
  return [
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    `${pad(date.getHours())}-${pad(date.getMinutes())}-${pad(date.getSeconds())}`,
    pad(date.getMilliseconds(), 3),
  ].join('_');
}

async function saveCanvasPng(filePath: string, canvas: Canvas): Promise<void> {
  await fs.writeFile(filePath, canvas.toBuffer('image/png'));
}

function cropFound(screen: ScreenCapture, found: FindRes): Canvas {
  const cropCanvas = createCanvas(found.w, found.h);
  const cropCtx = cropCanvas.getContext('2d');
  cropCtx.drawImage(
    screen.canvas,
    found.x - screen.x,
    found.y - screen.y,
    found.w,
    found.h,
    0,
    0,
    found.w,
    found.h,
  );
  return cropCanvas;
}

async function saveNumberDebugCrop(
  frameDir: string,
  screen: ScreenCapture,
  needle: Needle,
  found: FindRes,
  index: number,
): Promise<void> {
  const displayName = needleDisplayName(needle.name);
  const score = Math.round((found.score ?? 0) * 1000);
  const cropPath = path.join(
    frameDir,
    `${debugTimestamp()}_${String(index).padStart(2, '0')}_${displayName}_${found.x}_${found.y}_${score}.png`,
  );
  await saveCanvasPng(cropPath, cropFound(screen, found));
}

function foundRelativeToScreen(screen: ScreenCapture, found: FindRes): FindRes {
  return {
    ...found,
    x: found.x - screen.x,
    y: found.y - screen.y,
  };
}

async function loadOptionalNeedle(
  needlePath: string,
  settings: NeedleSettings,
): Promise<Needle | undefined> {
  try {
    await fs.access(needlePath);
  } catch {
    console.warn(`needle not found: ${needlePath}`);
    return;
  }

  return loadNeedle(needlePath, settings);
}

async function loadSkillRarityDebugNeedles(): Promise<Needle[]> {
  if (!DEBUG_SKILL_RARITY_SCREENSHOTS) {
    return [];
  }

  const needles: Needle[] = [];
  for (const file of DEBUG_SKILL_RARITY_NEEDLE_FILES) {
    const needle = await loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, file),
      DEBUG_SKILL_RARITY_NEEDLE_SETTINGS,
    );
    if (needle) {
      needles.push(needle);
    }
  }

  return needles;
}

async function saveSkillRarityDebugScreenshots(
  screen: ScreenCapture,
  needles: readonly Needle[],
  startedAt: number,
): Promise<void> {
  if (
    needles.length === 0 ||
    debugSkillRarityScreenshotCount >= DEBUG_SKILL_RARITY_MAX_SCREENSHOTS
  ) {
    return;
  }

  const matches = needles.flatMap((needle) =>
    findAllInScreen(screen, needle).map((found) => ({
      needle,
      found,
    })),
  );

  if (matches.length === 0) {
    return;
  }

  const frameName = frameDebugName(startedAt);
  debugSkillRarityScreenshotCount += 1;
  const frameDir = path.join(DEBUG_SKILL_RARITY_SCREENSHOTS_DIR, frameName);
  await fs.mkdir(frameDir, { recursive: true });
  await saveCanvasPng(path.join(frameDir, `${frameName}_screen.png`), screen.canvas);

  const metadata = {
    frame: frameName,
    capturedAt: new Date(startedAt).toISOString(),
    screenRegion: SCREEN_REGION,
    matches: matches.map(({ needle, found }) => ({
      needle: needle.name,
      score: found.score,
      rect: found,
      rectInSavedScreenshot: foundRelativeToScreen(screen, found),
    })),
  };
  await fs.writeFile(
    path.join(frameDir, `${frameName}_matches.json`),
    JSON.stringify(metadata, null, 2),
  );
  console.log(
    `debug skill rarity screenshot: ${frameName}, matches: ${matches
      .map(({ needle, found }) => `${needleDisplayName(needle.name)}=${found.score?.toFixed(3)}`)
      .join(', ')}`,
  );

  for (const [index, { needle, found }] of matches.entries()) {
    const displayName = needleDisplayName(needle.name);
    const score = Math.round((found.score ?? 0) * 1000);
    await saveCanvasPng(
      path.join(
        frameDir,
        `${frameName}_${String(index + 1).padStart(2, '0')}_${displayName}_${score}_crop.png`,
      ),
      cropFound(screen, found),
    );
  }
}

async function loadSkillChoiceLocators(): Promise<SkillChoiceLocator[]> {
  const locators: SkillChoiceLocator[] = [];

  for (const config of SKILL_CHOICE_LOCATOR_CONFIGS) {
    locators.push({
      needle: await loadNeedle(config.path, config.settings),
      numberRect: config.numberRect,
      clickOffset: config.clickOffset,
    });
  }

  return locators;
}

async function loadRerollNeedle(): Promise<Needle | undefined> {
  try {
    await fs.access(REROLL_NEEDLE_PATH);
  } catch {
    console.warn(`reroll needle not found: ${REROLL_NEEDLE_PATH}`);
    return;
  }

  return loadNeedle(REROLL_NEEDLE_PATH, REROLL_NEEDLE_SETTINGS);
}

async function clickRerollIfFound(screen: ScreenCapture, rerollNeedle?: Needle): Promise<boolean> {
  if (!rerollNeedle) {
    return false;
  }

  const [found] = findAllInScreen(screen, rerollNeedle, { maxResults: 1 });
  if (!found) {
    return false;
  }

  await clickFound(found);
  return true;
}

async function handleSkillChoice(
  screen: ScreenCapture,
  locators: readonly SkillChoiceLocator[],
  weights: SkillWeights,
  rerollNeedle?: Needle,
): Promise<boolean> {
  const slots = findSkillChoiceSlots(screen, locators);
  if (slots.length !== 3) {
    return false;
  }

  const readResults = await readSkillChoiceSlots(screen, slots, SKILL_CHOICE_OCR_OPTIONS);
  const sawAnyNumberText = readResults.some((result) => result.rawNumber.length > 0);
  if (!sawAnyNumberText) {
    return false;
  }

  const choices = buildSkillChoices(readResults, weights);
  if (choices.length !== slots.length) {
    const readings = readResults
      .map((result) => `${result.slot.name}: ${result.rawNumber || '(missing)'}`)
      .join(', ');
    console.log(`skill OCR incomplete: ${readings}`);
    return true;
  }

  const best = bestSkillChoice(choices);
  if (!best) {
    return true;
  }

  const choiceSummary = formatSkillChoices(choices);
  if (best.weight >= weights.threshold) {
    console.log(`skill choose: ${best.slot.name} #${best.skillNumber}, ${choiceSummary}`);
    await clickScreenPoint(best.slot.clickPoint);
    return true;
  }

  if (await clickRerollIfFound(screen, rerollNeedle)) {
    console.log(
      `skill reroll: best #${best.skillNumber}=${best.weight} under threshold ${weights.threshold}, ${choiceSummary}`,
    );
    return true;
  }

  console.log(
    `skill below threshold: best #${best.skillNumber}=${best.weight}, threshold ${weights.threshold}; reroll needle not found`,
  );
  return true;
}

async function main(): Promise<void> {
  try {
    const needlesByName = await loadNeedlesByNameFromDir(NEEDLE_DIR, NEEDLE_NAME_BY_KEY);
    const needles = ACTIVE_NEEDLES.map((name) => needlesByName[name]);
    const skillWeights = await loadSkillWeights(SKILL_WEIGHTS_CONFIG_PATH);
    const skillChoiceLocators = await loadSkillChoiceLocators();
    const skillRarityDebugNeedles = await loadSkillRarityDebugNeedles();
    const rerollNeedle = await loadRerollNeedle();

    if (DEBUG_NUMBER_OCR && !needles.some((needle) => isDebugNumberNeedle(needle.name))) {
      console.warn(`debug number needle is not loaded: ${DEBUG_NUMBER_NEEDLE}`);
    }

    for (const needle of needles) {
      if (needle.matchThreshold !== undefined) {
        console.log(
          `loaded: ${needleDisplayName(needle.name)}, threshold: ${needle.matchThreshold}`,
        );
      }
    }

    for (;;) {
      const startedAt = Date.now();
      const screen = await captureScreen(SCREEN_REGION);
      let debugFrameDir: string | undefined;
      let debugCropIndex = 0;

      const ensureDebugFrameDir = async (): Promise<string> => {
        if (!debugFrameDir) {
          const timestamp = debugTimestamp(startedAt);
          debugFrameDir = path.join(DEBUG_NUMBER_OCR_DIR, frameDebugName(startedAt));
          await fs.mkdir(debugFrameDir, { recursive: true });
          await saveCanvasPng(
            path.join(debugFrameDir, `${timestamp}_screenshot.png`),
            screen.canvas,
          );
        }
        return debugFrameDir;
      };

      try {
        await saveSkillRarityDebugScreenshots(screen, skillRarityDebugNeedles, startedAt);

        const handledSkillChoice = await handleSkillChoice(
          screen,
          skillChoiceLocators,
          skillWeights,
          rerollNeedle,
        );

        if (!handledSkillChoice) {
          for (const needle of needles) {
            const foundMatches = findAllInScreen(screen, needle);
            for (const found of foundMatches) {
              const logParts = [
                `found: ${needleDisplayName(needle.name)}`,
                `score: ${found.score?.toFixed(3)}`,
              ];

              if (READ_TEXT) {
                const text = await readTextInFound(screen, found);
                logParts.push(`text: ${text || '(empty)'}`);
              }

              if (shouldReadNumber(needle.name)) {
                const number = await readNumberInFound(screen, found);
                logParts.push(`number: ${number || '(missing)'}`);
              }

              if (DEBUG_NUMBER_OCR && isDebugNumberNeedle(needle.name)) {
                const frameDir = await ensureDebugFrameDir();
                debugCropIndex += 1;
                await saveNumberDebugCrop(frameDir, screen, needle, found, debugCropIndex);
              }

              console.log(logParts.join(', '));
              await clickFound(found);
            }
          }
        }
      } finally {
        screen.release();
      }

      const elapsedMs = Date.now() - startedAt;
      await setTimeout(Math.max(0, SCREENSHOT_INTERVAL_MS - elapsedMs));
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

void main();
