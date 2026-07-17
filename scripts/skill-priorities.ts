#!/usr/bin/env tsx

import { skillStrategy } from '../obsidian-knight/skill-weights.js';
import { skillTuningForActiveSkillCount } from '../src/skill-tuning-config.js';
import {
  createSkillTuning,
  type GameMode,
  type SkillDefinition,
  type SkillEvaluationContext,
  type SkillTuning,
} from '../src/skill-strategy.js';

type SkillRarity = NonNullable<SkillEvaluationContext['rarity']>;
type SortMode = 'pick' | 'reroll';

interface Options {
  activeSkills: number[];
  gameMode: GameMode;
  json: boolean;
  limit?: number;
  offenseDefenseBalance?: number;
  rarity?: SkillRarity;
  rerollAggression?: number;
  rerollThreshold?: number;
  ruins: boolean;
  sort: SortMode;
}

interface SkillPriorityRow {
  action: 'pick' | 'reroll';
  pickScore: number;
  rerollScore: number;
  skill: SkillDefinition;
}

const VALID_RARITIES = new Set<SkillRarity>(['common', 'rare', 'epic']);
const VALID_GAME_MODES = new Set<GameMode>(['default', 'pvp']);
const VALID_SORT_MODES = new Set<SortMode>(['pick', 'reroll']);

function usage(): string {
  return [
    'Usage:',
    '  pnpm run skill-priorities -- [options]',
    '',
    'Without tuning flags, this reads the same tuning config used by src/main.ts.',
    '',
    'Options:',
    '  --balance, --offense <0..1>          0 = defensive, 0.5 = balanced, 1 = offensive',
    '  --reroll-aggression, --reroll <0..1> 0 = conservative rerolls, 1 = aggressive rerolls',
    '  --threshold <number>                 Override the reroll threshold directly',
    '  --active <numbers>                   Comma-separated active skills, for example 112,236',
    '  --active-count <number>              Simulate this many active skills using 1..N',
    '  --rarity <common|rare|epic>          Simulate the offered skill rarity',
    '  --game-mode <default|pvp>            Simulate the game mode',
    '  --ruins, --no-ruins                  Toggle the ruins feature flag',
    '  --sort <pick|reroll>                 Sort by pick score or reroll score',
    '  --limit <number>                     Print only the first N skills',
    '  --json                              Print machine-readable output',
    '  --help                              Show this help',
    '',
    'Examples:',
    '  pnpm run skill-priorities -- --limit 50',
    '  pnpm run skill-priorities -- --balance 0.85 --reroll 0.75 --limit 40',
    '  pnpm run skill-priorities -- --balance 0.25 --threshold 35 --active 112,236 --rarity epic',
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

function parseNumber(value: string, flag: string, min?: number, max?: number): number {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    throw new Error(`${flag} must be a number`);
  }

  if (min !== undefined && parsed < min) {
    throw new Error(`${flag} must be at least ${min}`);
  }

  if (max !== undefined && parsed > max) {
    throw new Error(`${flag} must be at most ${max}`);
  }

  return parsed;
}

function parseInteger(value: string, flag: string, min?: number, max?: number): number {
  const parsed = parseNumber(value, flag, min, max);

  if (!Number.isInteger(parsed)) {
    throw new Error(`${flag} must be an integer`);
  }

  return parsed;
}

function parseActiveSkills(value: string, flag: string): number[] {
  if (value.trim() === '') {
    return [];
  }

  return value.split(',').map((part) => parseInteger(part.trim(), flag, 1, 300));
}

function parseRarity(value: string, flag: string): SkillRarity {
  if (!VALID_RARITIES.has(value as SkillRarity)) {
    throw new Error(`${flag} must be one of: common, rare, epic`);
  }

  return value as SkillRarity;
}

function parseGameMode(value: string, flag: string): GameMode {
  if (!VALID_GAME_MODES.has(value as GameMode)) {
    throw new Error(`${flag} must be one of: default, pvp`);
  }

  return value as GameMode;
}

function parseSortMode(value: string, flag: string): SortMode {
  if (!VALID_SORT_MODES.has(value as SortMode)) {
    throw new Error(`${flag} must be one of: pick, reroll`);
  }

  return value as SortMode;
}

function parseArgs(argv: readonly string[]): Options | 'help' {
  const options: Options = {
    activeSkills: [],
    gameMode: 'default',
    json: false,
    ruins: false,
    sort: 'pick',
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
      case '--':
        break;

      case '--help':
      case '-h':
        return 'help';

      case '--balance':
      case '--offense':
      case '--offense-defense-balance': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.offenseDefenseBalance = parseNumber(result.value, flag, 0, 1);
        index = result.nextIndex;
        break;
      }

      case '--reroll':
      case '--reroll-aggression': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.rerollAggression = parseNumber(result.value, flag, 0, 1);
        index = result.nextIndex;
        break;
      }

      case '--threshold':
      case '--reroll-threshold': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.rerollThreshold = parseNumber(result.value, flag, 0);
        index = result.nextIndex;
        break;
      }

      case '--active':
      case '--active-skills': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.activeSkills = parseActiveSkills(result.value, flag);
        index = result.nextIndex;
        break;
      }

      case '--active-count': {
        const result = flagValue(argv, index, flag, inlineValue);
        const count = parseInteger(result.value, flag, 0, 300);
        options.activeSkills = Array.from({ length: count }, (_, skillIndex) => skillIndex + 1);
        index = result.nextIndex;
        break;
      }

      case '--rarity': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.rarity = parseRarity(result.value, flag);
        index = result.nextIndex;
        break;
      }

      case '--game-mode':
      case '--mode': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.gameMode = parseGameMode(result.value, flag);
        index = result.nextIndex;
        break;
      }

      case '--sort': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.sort = parseSortMode(result.value, flag);
        index = result.nextIndex;
        break;
      }

      case '--limit': {
        const result = flagValue(argv, index, flag, inlineValue);
        options.limit = parseInteger(result.value, flag, 1, 300);
        index = result.nextIndex;
        break;
      }

      case '--json':
        options.json = true;
        break;

      case '--ruins':
        options.ruins = true;
        break;

      case '--no-ruins':
        options.ruins = false;
        break;

      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }

  return options;
}

function activeSkillTexts(activeSkills: readonly number[]): string[] {
  const texts: string[] = [];

  for (const skillNumber of activeSkills) {
    const skill = skillStrategy.skills.get(skillNumber);

    if (skill !== undefined) {
      texts.push(skill.text);
    }
  }

  return texts;
}

function createContext(
  skill: SkillDefinition,
  options: Options,
  tuning: SkillTuning,
  nowMs: number,
): SkillEvaluationContext {
  return {
    activeSkills: new Set(options.activeSkills),
    activeSkillTexts: activeSkillTexts(options.activeSkills),
    elapsedMs: 0,
    flags: { ruins: options.ruins },
    gameMode: options.gameMode,
    nowMs,
    offeredSkillNumbers: [skill.skillNumber],
    rarity: options.rarity,
    runStartedAtMs: nowMs,
    skillNumber: skill.skillNumber,
    stats: {},
    tuning,
  };
}

function createRows(options: Options, tuning: SkillTuning): SkillPriorityRow[] {
  const nowMs = Date.now();
  const rows = [...skillStrategy.skills.values()].map((skill) => {
    const context = createContext(skill, options, tuning, nowMs);

    return {
      action: skill.shouldRerollIfPossible(context) ? 'reroll' : 'pick',
      pickScore: skill.pickScore(context),
      rerollScore: skill.rerollScore(context),
      skill,
    } satisfies SkillPriorityRow;
  });

  rows.sort((left, right) => {
    const leftScore = options.sort === 'pick' ? left.pickScore : left.rerollScore;
    const rightScore = options.sort === 'pick' ? right.pickScore : right.rerollScore;

    return rightScore - leftScore || left.skill.skillNumber - right.skill.skillNumber;
  });

  return options.limit === undefined ? rows : rows.slice(0, options.limit);
}

function createReportTuning(options: Options): SkillTuning {
  const configuredTuning = skillTuningForActiveSkillCount(options.activeSkills.length);
  const tuning: Partial<SkillTuning> = {
    offenseDefenseBalance: options.offenseDefenseBalance ?? configuredTuning.offenseDefenseBalance,
    rerollAggression: options.rerollAggression ?? configuredTuning.rerollAggression,
  };

  if (options.rerollThreshold !== undefined) {
    tuning.rerollThreshold = options.rerollThreshold;
  } else if (options.rerollAggression === undefined) {
    tuning.rerollThreshold = configuredTuning.rerollThreshold;
  }

  return createSkillTuning(tuning);
}

function formatScore(score: number): string {
  return Number.isInteger(score) ? score.toString() : score.toFixed(2);
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function renderTable(
  options: Options,
  tuning: SkillTuning,
  rows: readonly SkillPriorityRow[],
): string {
  const lines = [
    'Skill priority report',
    [
      `sort=${options.sort}`,
      `balance=${formatScore(tuning.offenseDefenseBalance)}`,
      `rerollAggression=${formatScore(tuning.rerollAggression)}`,
      `rerollThreshold=${formatScore(tuning.rerollThreshold)}`,
      `activeSkills=${options.activeSkills.length}`,
      `rarity=${options.rarity ?? 'none'}`,
      `gameMode=${options.gameMode}`,
      `ruins=${options.ruins}`,
    ].join('  '),
    '',
    [
      'rank'.padStart(4),
      'skill'.padStart(5),
      'pick'.padStart(12),
      'reroll'.padStart(10),
      'action'.padEnd(6),
      'tags'.padEnd(28),
      'text',
    ].join('  '),
  ];

  rows.forEach((row, index) => {
    const tags = row.skill.tags.join(',');

    lines.push(
      [
        String(index + 1).padStart(4),
        String(row.skill.skillNumber).padStart(5),
        formatScore(row.pickScore).padStart(12),
        `${formatScore(row.rerollScore)}/${formatScore(tuning.rerollThreshold)}`.padStart(10),
        row.action.padEnd(6),
        tags.padEnd(28),
        normalizeText(row.skill.text),
      ].join('  '),
    );
  });

  return lines.join('\n');
}

function renderJson(
  options: Options,
  tuning: SkillTuning,
  rows: readonly SkillPriorityRow[],
): string {
  return JSON.stringify(
    {
      options: {
        activeSkills: options.activeSkills,
        gameMode: options.gameMode,
        rarity: options.rarity,
        ruins: options.ruins,
        sort: options.sort,
      },
      tuning,
      skills: rows.map((row, index) => ({
        rank: index + 1,
        skillNumber: row.skill.skillNumber,
        pickScore: row.pickScore,
        rerollScore: row.rerollScore,
        rerollThreshold: tuning.rerollThreshold,
        action: row.action,
        tags: row.skill.tags,
        text: row.skill.text,
      })),
    },
    null,
    2,
  );
}

function main(): void {
  const parsed = parseArgs(process.argv.slice(2));

  if (parsed === 'help') {
    console.log(usage());
    return;
  }

  const tuning = createReportTuning(parsed);
  const rows = createRows(parsed, tuning);

  console.log(parsed.json ? renderJson(parsed, tuning, rows) : renderTable(parsed, tuning, rows));
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  console.error('');
  console.error(usage());
  process.exitCode = 1;
}
