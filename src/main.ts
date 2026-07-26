/*
npx tsx ./src/main.ts
*/

import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createCanvas, type Canvas } from 'canvas';

import { skillStrategy } from '../obsidian-knight/skill-weights.js';
import { NEEDLE_NAME_BY_KEY, type NeedleKey } from './generated/needle-names.js';
import { NEEDLE_GROUPS } from './needle-groups.js';
import {
  readNumberInFound,
  readNumberInScreen,
  readTextInFound,
  readTextInScreen,
  type OcrImageOptions,
  type TextOcrOptions,
} from './ocr.js';
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
  activeSkillTags,
  activeSkillTexts,
  activeSkillTiers,
  createSkillRunState,
  getSkillDefinition,
  isActionNeedleEnabled,
  markSkillPicked,
  type GameMode,
  type SkillDefinition,
  type SkillEvaluationContext,
  type SkillRunState,
  type SkillStrategy,
  type SkillTuning,
} from './skill-strategy.js';
import {
  bestSkillTextCatalogMatch,
  isReliableSkillTextCatalogMatch,
  loadSkillTextCatalog,
  type SkillTextCatalogEntry,
  type SkillTextCatalogMatch,
} from './skill-text-catalog.js';
import { skillTuningForActiveSkillCount } from './skill-tuning-config.js';

const NEEDLE_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles_dung';
const SKILL_NEEDLE_DIR =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles_scrcpy';
const DEBUG_NUMBER_OCR_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/number-ocr';
const DEBUG_SKILL_RARITY_SCREENSHOTS_DIR =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/skill-rarity-screenshots';
const SKILL_TEXT_CATALOG_PATH =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/skill-text-catalog.txt';
const DEBUG_SKILL_TEXT_MATCH_LOG_PATH =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/skill-text-match-observations.jsonl';
const DEBUG_SKILL_TEXT_NUMBER_MAP_PATH =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/skill-text-number-matches.json';

const SCREENSHOT_INTERVAL_MS = 1000;
const SCREEN_CAPTURE_MAX_ATTEMPTS = 10;
const SCREEN_CAPTURE_RETRY_BASE_DELAY_MS = 250;
const SCREEN_REGION: Rect = { x: 1326, y: 122, w: 1680, h: 762 };
const GAME_MODE: GameMode = 'default';

const READ_TEXT = false;
const READ_NUMBER = true;
const MATCH_SKILL_TEXTS = true;
const DEBUG_NUMBER_OCR = false;
const DEBUG_NUMBER_NEEDLE = 'skill_number_rare.png';
const DEBUG_SKILL_RARITY_SCREENSHOTS = false;
const DEBUG_SKILL_RARITY_MAX_SCREENSHOTS = 100;
const SKILL_NUMBER_NEEDLE_KEYS = new Set<NeedleKey>(NEEDLE_GROUPS.skillNumbers);
const ACTIVE_NEEDLES = NEEDLE_GROUPS.all.filter((name) => !SKILL_NUMBER_NEEDLE_KEYS.has(name));

interface SkillRarityMatch {
  needle: Needle;
  found: FindRes;
}

interface FixedSkillNumberRead {
  rect: Rect;
  rawNumber: string;
  number?: number;
  attempts: FixedSkillNumberReadAttempt[];
}

interface FixedSkillNumberReadAttempt {
  rect: Rect;
  rawNumber: string;
  options: OcrImageOptions;
}

interface FixedSkillTextRead {
  attempts: FixedSkillTextReadAttempt[];
  match?: SkillTextCatalogMatch;
  rawText: string;
  rect: Rect;
}

interface FixedSkillTextReadAttempt {
  match?: SkillTextCatalogMatch;
  options: TextOcrOptions;
  rawText: string;
  rect: Rect;
}

interface FixedSkillChoiceCandidate {
  index: number;
  read: FixedSkillNumberRead;
  rarityMatch?: SkillRarityMatch;
}

interface SkillPickDecision {
  candidate: FixedSkillChoiceCandidate;
  context: SkillEvaluationContext;
  definition: SkillDefinition;
  pickWeight: number;
  rerollWeight: number;
  shouldRerollIfPossible: boolean;
  tags: readonly string[];
}

interface ScrcpyActionNeedles {
  closeButton?: Needle;
  closeOffer1?: Needle;
  closeOffer2?: Needle;
  closeOffer3?: Needle;
  loot2?: Needle;
  offerBlacksmiths?: Needle;
  offerJourneyman?: Needle;
  pvpOk?: Needle;
  questionMarkTreasure?: Needle;
  rewardDarksteel?: Needle;
  rewardOrbs?: Needle;
  rewardRage?: Needle;
  rewardRubies?: Needle;
  retry?: Needle;
  ruinsArrowDown?: Needle;
  ruinsEnter?: Needle;
  ruinsToDepth?: Needle;
  ruinsWorld?: Needle;
  ruinsYes?: Needle;
  start?: Needle;
}

type SkillRarity = 'common' | 'rare' | 'epic';

const SKILL_NUMBER_RECTS_IN_SCREENSHOT: Rect[] = [
  { x: 453, y: 80, w: 43, h: 15 },
  { x: 825, y: 80, w: 43, h: 15 },
  { x: 1196, y: 80, w: 43, h: 15 },
];
const SKILL_TEXT_RECTS_IN_SCREENSHOT: Rect[] = [
  { x: 350, y: 390, w: 260, h: 120 },
  { x: 720, y: 390, w: 260, h: 120 },
  { x: 1090, y: 390, w: 260, h: 120 },
];
const SKILL_NUMBER_CLICK_Y_OFFSET = 150;

const MIN_SKILL_NUMBER = 1;
const MAX_SKILL_NUMBER = 300;

const DEBUG_SKILL_RARITY_NEEDLE_FILES = ['common.png', 'rare.png', 'epic.png'] as const;
const SKILL_RARITY_NEEDLE_SETTINGS: NeedleSettings = {
  matchThreshold: 0.9,
  maxResults: 10,
  overlapThreshold: 0.5,
};
const REROLL_NEEDLE_PATH = path.join(SKILL_NEEDLE_DIR, 'reroll.png');
const REROLL_NEEDLE_SETTINGS: NeedleSettings = {
  matchThreshold: 0.9,
  maxResults: 1,
  overlapThreshold: 0.5,
};
const SCRCPY_ACTION_NEEDLE_SETTINGS: NeedleSettings = {
  matchThreshold: 0.8,
  maxResults: 1,
  overlapThreshold: 0.5,
};
const CLOSE_OFFER_NEEDLE_SETTINGS: NeedleSettings = {
  matchThreshold: 0.99,
  maxResults: 1,
  overlapThreshold: 0.5,
};
const OFFER_BUNDLE_NEEDLE_SETTINGS: NeedleSettings = {
  matchThreshold: 0.7,
  maxResults: 1,
  overlapThreshold: 0.5,
};
const AUTO_CLICK_RETRY = true;
const ENABLE_RUINS = false;
const LOOT_2_AFTER_CLICK_DELAY_MS = 500;

const SKILL_CHOICE_OCR_OPTIONS: OcrImageOptions = { scale: 5, threshold: false };
const SKILL_CHOICE_OCR_FALLBACK_OPTIONS: OcrImageOptions[] = [
  SKILL_CHOICE_OCR_OPTIONS,
  { scale: 6, threshold: false },
  { scale: 8, threshold: false },
  { scale: 5, threshold: 120 },
  { scale: 5, threshold: 140 },
  { scale: 5, threshold: 160 },
  { scale: 5, threshold: 180 },
  { scale: 8, threshold: 120 },
  { scale: 8, threshold: 140 },
  { scale: 8, threshold: 160 },
];
const SKILL_TEXT_MATCH_MIN_SCORE = 0.62;
const SKILL_TEXT_MATCH_MIN_MARGIN = 0.04;
const SKILL_TEXT_OCR_FALLBACK_OPTIONS: TextOcrOptions[] = [
  { scale: 3, threshold: false },
  { scale: 4, threshold: false },
  { scale: 4, threshold: 160 },
  { scale: 5, threshold: 170 },
];

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

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function captureScreenWithRetry(region: Rect): Promise<ScreenCapture> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= SCREEN_CAPTURE_MAX_ATTEMPTS; attempt += 1) {
    try {
      return await captureScreen(region);
    } catch (error) {
      lastError = error;
      if (attempt === SCREEN_CAPTURE_MAX_ATTEMPTS) {
        break;
      }

      const delayMs = attempt * SCREEN_CAPTURE_RETRY_BASE_DELAY_MS;
      console.warn(
        `screen capture failed, retrying ${attempt}/${SCREEN_CAPTURE_MAX_ATTEMPTS}: ${errorMessage(
          error,
        )}`,
      );
      await setTimeout(delayMs);
    }
  }

  throw lastError;
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

async function loadSkillRarityNeedles(): Promise<Needle[]> {
  const needles: Needle[] = [];
  for (const file of DEBUG_SKILL_RARITY_NEEDLE_FILES) {
    const needle = await loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, file),
      SKILL_RARITY_NEEDLE_SETTINGS,
    );
    if (needle) {
      needles.push(needle);
    }
  }

  return needles;
}

async function loadRerollNeedle(): Promise<Needle | undefined> {
  return loadOptionalNeedle(REROLL_NEEDLE_PATH, REROLL_NEEDLE_SETTINGS);
}

async function loadRuinsActionNeedle(fileName: string): Promise<Needle | undefined> {
  if (!ENABLE_RUINS) {
    return;
  }

  return loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, fileName), SCRCPY_ACTION_NEEDLE_SETTINGS);
}

async function loadScrcpyActionNeedles(): Promise<ScrcpyActionNeedles> {
  const [
    closeButton,
    closeOffer1,
    closeOffer2,
    closeOffer3,
    loot2,
    offerBlacksmiths,
    offerJourneyman,
    pvpOk,
    questionMarkTreasure,
    rewardDarksteel,
    rewardOrbs,
    rewardRage,
    rewardRubies,
    retry,
    ruinsArrowDown,
    ruinsEnter,
    ruinsToDepth,
    ruinsWorld,
    ruinsYes,
    start,
  ] = await Promise.all([
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'close_button.png'),
      SCRCPY_ACTION_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'close_offer_1.png'),
      CLOSE_OFFER_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'close_offer_2.png'),
      CLOSE_OFFER_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'close_offer_3.png'),
      CLOSE_OFFER_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'loot_2.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'offer_blacksmiths.png'),
      OFFER_BUNDLE_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'offer_journeyman.png'),
      OFFER_BUNDLE_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'pvp_ok.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'question_mark_treasure.png'),
      SCRCPY_ACTION_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'reward_darksteel.png'),
      SCRCPY_ACTION_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'reward_orbs.png'),
      SCRCPY_ACTION_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'reward_rage.png'),
      SCRCPY_ACTION_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(
      path.join(SKILL_NEEDLE_DIR, 'reward_rubies.png'),
      SCRCPY_ACTION_NEEDLE_SETTINGS,
    ),
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'retry.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
    loadRuinsActionNeedle('ruins_arrow_down.png'),
    loadRuinsActionNeedle('ruins_enter.png'),
    loadRuinsActionNeedle('ruins_to_depth.png'),
    loadRuinsActionNeedle('ruins_world.png'),
    loadRuinsActionNeedle('ruins_yes.png'),
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'start.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
  ]);

  return {
    closeButton,
    closeOffer1,
    closeOffer2,
    closeOffer3,
    loot2,
    offerBlacksmiths,
    offerJourneyman,
    pvpOk,
    questionMarkTreasure,
    rewardDarksteel,
    rewardOrbs,
    rewardRage,
    rewardRubies,
    retry,
    ruinsArrowDown,
    ruinsEnter,
    ruinsToDepth,
    ruinsWorld,
    ruinsYes,
    start,
  };
}

function findSkillRarityMatches(
  screen: ScreenCapture,
  needles: readonly Needle[],
): SkillRarityMatch[] {
  return needles
    .flatMap((needle) =>
      findAllInScreen(screen, needle).map((found) => ({
        needle,
        found,
      })),
    )
    .sort((a, b) => (b.found.score ?? 0) - (a.found.score ?? 0));
}

function selectSkillRarityMatches(matches: readonly SkillRarityMatch[]): SkillRarityMatch[] {
  const groups = new Map<string, SkillRarityMatch[]>();
  for (const match of matches) {
    const group = groups.get(match.needle.name) ?? [];
    group.push(match);
    groups.set(match.needle.name, group);
  }

  const [bestGroup] = [...groups.values()].sort((a, b) => {
    const aDistanceFromExpected = Math.abs(a.length - SKILL_NUMBER_RECTS_IN_SCREENSHOT.length);
    const bDistanceFromExpected = Math.abs(b.length - SKILL_NUMBER_RECTS_IN_SCREENSHOT.length);
    if (aDistanceFromExpected !== bDistanceFromExpected) {
      return aDistanceFromExpected - bDistanceFromExpected;
    }

    const aAverageScore = a.reduce((sum, match) => sum + (match.found.score ?? 0), 0) / a.length;
    const bAverageScore = b.reduce((sum, match) => sum + (match.found.score ?? 0), 0) / b.length;
    return bAverageScore - aAverageScore;
  });

  if (!bestGroup) {
    return [];
  }

  return [...bestGroup]
    .sort((a, b) => (b.found.score ?? 0) - (a.found.score ?? 0))
    .slice(0, SKILL_NUMBER_RECTS_IN_SCREENSHOT.length)
    .sort((a, b) => a.found.x - b.found.x);
}

function skillRarityFromNeedleName(needleName: string): SkillRarity | undefined {
  const rarity = needleDisplayName(needleName);
  if (rarity === 'common' || rarity === 'rare' || rarity === 'epic') {
    return rarity;
  }

  return;
}

function selectedSkillRarity(matches: readonly SkillRarityMatch[]): SkillRarity | undefined {
  const [match] = matches;
  return match ? skillRarityFromNeedleName(match.needle.name) : undefined;
}

function skillNumberRectsInScreen(screen: ScreenCapture): Rect[] {
  return SKILL_NUMBER_RECTS_IN_SCREENSHOT.map((rect) => ({
    ...rect,
    x: screen.x + rect.x,
    y: screen.y + rect.y,
  }));
}

function skillTextRectsInScreen(screen: ScreenCapture): Rect[] {
  return SKILL_TEXT_RECTS_IN_SCREENSHOT.map((rect) => ({
    ...rect,
    x: screen.x + rect.x,
    y: screen.y + rect.y,
  }));
}

function skillNumberClickPoint(read: FixedSkillNumberRead): { x: number; y: number } {
  return {
    x: read.rect.x + read.rect.w / 2,
    y: read.rect.y + read.rect.h / 2 + SKILL_NUMBER_CLICK_Y_OFFSET,
  };
}

function skillNumberOcrRects(rect: Rect): Rect[] {
  return [
    rect,
    { x: rect.x, y: rect.y + 2, w: rect.w, h: rect.h - 4 },
    { x: rect.x - 2, y: rect.y, w: rect.w + 4, h: rect.h },
    { x: rect.x - 2, y: rect.y + 2, w: rect.w + 4, h: rect.h - 4 },
    { x: rect.x - 4, y: rect.y - 2, w: rect.w + 8, h: rect.h + 4 },
  ];
}

function isSkillNumberValidForRarity(
  rawNumber: string,
  number: number,
  rarity?: SkillRarity,
): boolean {
  if (rarity === 'common') {
    return true;
  }

  if (rarity === 'rare' || rarity === 'epic') {
    return rawNumber.length === 3 && number > 100;
  }

  return true;
}

function parseFixedSkillNumber(rawNumber: string, rarity?: SkillRarity): number | undefined {
  if (!/^\d+$/.test(rawNumber)) {
    return;
  }

  const number = Number(rawNumber);
  if (!Number.isInteger(number) || number < MIN_SKILL_NUMBER || number > MAX_SKILL_NUMBER) {
    return;
  }

  if (!isSkillNumberValidForRarity(rawNumber, number, rarity)) {
    return;
  }

  return number;
}

async function readFixedSkillNumber(
  screen: ScreenCapture,
  rect: Rect,
  rarity?: SkillRarity,
): Promise<FixedSkillNumberRead> {
  const attempts: FixedSkillNumberReadAttempt[] = [];

  for (const candidateRect of skillNumberOcrRects(rect)) {
    for (const options of SKILL_CHOICE_OCR_FALLBACK_OPTIONS) {
      const rawNumber = await readNumberInScreen(screen, candidateRect, options);
      const attempt: FixedSkillNumberReadAttempt = {
        rect: candidateRect,
        rawNumber,
        options,
      };
      attempts.push(attempt);

      const number = parseFixedSkillNumber(rawNumber, rarity);
      if (attempts.length === 1 && number !== undefined) {
        return {
          rect,
          rawNumber,
          number,
          attempts,
        };
      }
    }
  }

  const validAttempts = attempts.flatMap((attempt, index) => {
    const number = parseFixedSkillNumber(attempt.rawNumber, rarity);
    return number === undefined ? [] : [{ attempt, index, number }];
  });

  if (validAttempts.length > 0) {
    const ranked = [...validAttempts]
      .reduce<
        Array<{
          attempt: FixedSkillNumberReadAttempt;
          count: number;
          index: number;
          number: number;
        }>
      >((groups, validAttempt) => {
        const existing = groups.find((group) => group.number === validAttempt.number);
        if (existing) {
          existing.count += 1;
        } else {
          groups.push({
            attempt: validAttempt.attempt,
            count: 1,
            index: validAttempt.index,
            number: validAttempt.number,
          });
        }

        return groups;
      }, [])
      .sort((a, b) => b.count - a.count || a.index - b.index);
    const [best] = ranked;
    if (best) {
      return {
        rect,
        rawNumber: best.attempt.rawNumber,
        number: best.number,
        attempts,
      };
    }
  }

  return {
    rect,
    rawNumber: attempts.find((attempt) => attempt.rawNumber)?.rawNumber ?? '',
    attempts,
  };
}

async function readFixedSkillNumbers(
  screen: ScreenCapture,
  rarity?: SkillRarity,
): Promise<FixedSkillNumberRead[]> {
  const reads: FixedSkillNumberRead[] = [];

  for (const rect of skillNumberRectsInScreen(screen)) {
    reads.push(await readFixedSkillNumber(screen, rect, rarity));
  }

  return reads;
}

function isReliableSkillTextMatch(
  match: SkillTextCatalogMatch | undefined,
): match is SkillTextCatalogMatch {
  return isReliableSkillTextCatalogMatch(
    match,
    SKILL_TEXT_MATCH_MIN_SCORE,
    SKILL_TEXT_MATCH_MIN_MARGIN,
  );
}

async function readFixedSkillText(
  screen: ScreenCapture,
  rect: Rect,
  rarity: SkillRarity | undefined,
  catalog: readonly SkillTextCatalogEntry[],
): Promise<FixedSkillTextRead> {
  const attempts: FixedSkillTextReadAttempt[] = [];

  for (const options of SKILL_TEXT_OCR_FALLBACK_OPTIONS) {
    const rawText = await readTextInScreen(screen, rect, options);
    const match = bestSkillTextCatalogMatch(rawText, catalog, { rarity });
    const attempt: FixedSkillTextReadAttempt = {
      match,
      options,
      rawText,
      rect,
    };
    attempts.push(attempt);

    if (isReliableSkillTextMatch(match)) {
      return {
        attempts,
        match,
        rawText,
        rect,
      };
    }
  }

  const [bestAttempt] = [...attempts].sort((a, b) => (b.match?.score ?? 0) - (a.match?.score ?? 0));

  return {
    attempts,
    match: bestAttempt?.match,
    rawText: bestAttempt?.rawText ?? '',
    rect,
  };
}

async function readFixedSkillTexts(
  screen: ScreenCapture,
  rarity: SkillRarity | undefined,
  catalog: readonly SkillTextCatalogEntry[],
): Promise<FixedSkillTextRead[]> {
  if (!MATCH_SKILL_TEXTS) {
    return [];
  }

  const reads: FixedSkillTextRead[] = [];
  for (const rect of skillTextRectsInScreen(screen)) {
    reads.push(await readFixedSkillText(screen, rect, rarity, catalog));
  }

  return reads;
}

function formatSkillTextMatch(match: SkillTextCatalogMatch): string {
  return `${match.entry.rarity} #catalog-${match.entry.index + 1} score=${match.score.toFixed(
    3,
  )} margin=${match.margin.toFixed(3)} "${match.entry.text}"`;
}

function formatSkillTextRead(read: FixedSkillTextRead | undefined): string | undefined {
  if (!read) {
    return;
  }

  if (read.rawText.length === 0) {
    return '    text OCR=(empty)';
  }

  if (!read.match) {
    return `    text OCR=${JSON.stringify(read.rawText)}, no catalog match`;
  }

  return `    text OCR=${JSON.stringify(read.rawText)}, match=${formatSkillTextMatch(read.match)}`;
}

interface SkillTextMatchObservation {
  catalogIndex: number;
  matchedRarity: string;
  matchedText: string;
  observedAt: string;
  ocrText: string;
  rarity?: SkillRarity;
  score: number;
  skillNumber: number;
  slot: number;
}

interface SkillTextNumberMatchFile {
  generatedAt: string;
  matches: Record<string, SkillTextMatchObservation>;
}

function reliableSkillTextMatchObservations(
  numberReads: readonly FixedSkillNumberRead[],
  textReads: readonly FixedSkillTextRead[],
  rarity: SkillRarity | undefined,
): SkillTextMatchObservation[] {
  const observedAt = new Date().toISOString();

  return numberReads.flatMap((numberRead, index) => {
    const textRead = textReads[index];
    const match = textRead?.match;
    if (
      numberRead.number === undefined ||
      textRead === undefined ||
      !isReliableSkillTextMatch(match)
    ) {
      return [];
    }

    return [
      {
        catalogIndex: match.entry.index,
        matchedRarity: match.entry.rarity,
        matchedText: match.entry.text,
        observedAt,
        ocrText: textRead.rawText,
        rarity,
        score: match.score,
        skillNumber: numberRead.number,
        slot: index + 1,
      },
    ];
  });
}

async function readSkillTextNumberMatchFile(): Promise<SkillTextNumberMatchFile> {
  try {
    return JSON.parse(
      await fs.readFile(DEBUG_SKILL_TEXT_NUMBER_MAP_PATH, 'utf8'),
    ) as SkillTextNumberMatchFile;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return {
        generatedAt: new Date().toISOString(),
        matches: {},
      };
    }

    throw error;
  }
}

async function recordSkillTextMatches(
  numberReads: readonly FixedSkillNumberRead[],
  textReads: readonly FixedSkillTextRead[],
  rarity: SkillRarity | undefined,
): Promise<void> {
  const observations = reliableSkillTextMatchObservations(numberReads, textReads, rarity);
  if (observations.length === 0) {
    return;
  }

  await fs.mkdir(path.dirname(DEBUG_SKILL_TEXT_MATCH_LOG_PATH), { recursive: true });
  await fs.appendFile(
    DEBUG_SKILL_TEXT_MATCH_LOG_PATH,
    observations.map((observation) => JSON.stringify(observation)).join('\n') + '\n',
  );

  const mapFile = await readSkillTextNumberMatchFile();
  for (const observation of observations) {
    const key = String(observation.skillNumber);
    const existing = mapFile.matches[key];
    if (!existing || observation.score > existing.score) {
      mapFile.matches[key] = observation;
    }
  }

  mapFile.generatedAt = new Date().toISOString();
  await fs.writeFile(DEBUG_SKILL_TEXT_NUMBER_MAP_PATH, JSON.stringify(mapFile, null, 2));
}

function fixedSkillChoiceCandidates(
  rarityMatches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
): FixedSkillChoiceCandidate[] {
  return reads.flatMap((read, index) => {
    if (read.number === undefined) {
      return [];
    }

    return [
      {
        index,
        read,
        rarityMatch: rarityMatches[index],
      },
    ];
  });
}

function offeredSkillNumbers(reads: readonly FixedSkillNumberRead[]): number[] {
  return reads.flatMap((read) => (read.number === undefined ? [] : [read.number]));
}

function skillTuningForRunState(runState: SkillRunState): SkillTuning {
  return skillTuningForActiveSkillCount(runState.activeSkills.size);
}

function createSkillContext(
  strategy: SkillStrategy,
  runState: SkillRunState,
  reads: readonly FixedSkillNumberRead[],
  skillNumber: number,
  rarity: SkillRarity | undefined,
  tuning: SkillTuning,
  nowMs = Date.now(),
): SkillEvaluationContext {
  return {
    activeSkills: runState.activeSkills,
    activeSkillTags: activeSkillTags(strategy, runState),
    activeSkillTexts: activeSkillTexts(strategy, runState),
    activeSkillTiers: activeSkillTiers(strategy, runState),
    elapsedMs: nowMs - runState.startedAtMs,
    flags: runState.flags,
    gameMode: runState.gameMode,
    nowMs,
    offeredSkillNumbers: offeredSkillNumbers(reads),
    rarity,
    runStartedAtMs: runState.startedAtMs,
    skillNumber,
    stats: {},
    tuning,
  };
}

function evaluateSkillCandidates(
  rarityMatches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
  strategy: SkillStrategy,
  runState: SkillRunState,
): SkillPickDecision[] {
  const rarity = selectedSkillRarity(rarityMatches);
  const tuning = skillTuningForRunState(runState);
  const nowMs = Date.now();

  return fixedSkillChoiceCandidates(rarityMatches, reads).map((candidate) => {
    const skillNumber = candidate.read.number!;
    const context = createSkillContext(
      strategy,
      runState,
      reads,
      skillNumber,
      rarity,
      tuning,
      nowMs,
    );
    const definition = getSkillDefinition(strategy, skillNumber);
    const pickWeight = definition.pickScore(context);
    const rerollWeight = definition.rerollScore(context);

    return {
      candidate,
      context,
      definition,
      pickWeight,
      rerollWeight,
      shouldRerollIfPossible: definition.shouldRerollIfPossible(context),
      tags: definition.tags,
    };
  });
}

function compareSkillDecisions(a: SkillPickDecision, b: SkillPickDecision): number {
  return b.pickWeight - a.pickWeight || a.candidate.index - b.candidate.index;
}

function chooseBestSkill(decisions: readonly SkillPickDecision[]): SkillPickDecision | undefined {
  return [...decisions].sort(compareSkillDecisions)[0];
}

function chooseBestNonRerollSkill(
  decisions: readonly SkillPickDecision[],
): SkillPickDecision | undefined {
  return chooseBestSkill(decisions.filter((decision) => !decision.shouldRerollIfPossible));
}

function formatSkillTags(tags: readonly string[]): string {
  return tags.length > 0 ? tags.join(', ') : '(none)';
}

function formatSkillScore(score: number): string {
  return Number.isInteger(score) ? String(score) : score.toFixed(2);
}

function formatSkillDecisionIntent(decision: SkillPickDecision): string {
  return decision.shouldRerollIfPossible ? 'reroll if possible' : 'pick';
}

function formatSkillDecisionName(decision: SkillPickDecision): string {
  return `#${decision.context.skillNumber} ${decision.definition.text}`;
}

function formatSkillDecisionLine(
  read: FixedSkillNumberRead,
  index: number,
  decisions: readonly SkillPickDecision[],
  textReads: readonly FixedSkillTextRead[],
): string {
  const slot = `slot ${index + 1}`;
  const textLine = formatSkillTextRead(textReads[index]);
  if (read.number === undefined) {
    return [`  ${slot}: unread, raw=${JSON.stringify(read.rawNumber || '')}`, textLine]
      .filter((line): line is string => line !== undefined)
      .join('\n');
  }

  const decision = decisions.find((item) => item.candidate.index === index);
  if (!decision) {
    return [`  ${slot}: #${read.number}, no decision`, textLine]
      .filter((line): line is string => line !== undefined)
      .join('\n');
  }

  const matchScore = decision.candidate.rarityMatch?.found.score;
  const matchText = matchScore === undefined ? '' : `, matchScore=${matchScore.toFixed(3)}`;

  return [
    `  ${slot}: ${formatSkillDecisionName(decision)}`,
    `    raw=${JSON.stringify(read.rawNumber || '')}, pick=${formatSkillScore(
      decision.pickWeight,
    )}, reroll=${formatSkillScore(decision.rerollWeight)}/${formatSkillScore(
      decision.context.tuning.rerollThreshold,
    )}, decision=${formatSkillDecisionIntent(decision)}`,
    `    tags=${formatSkillTags(decision.tags)}${matchText}`,
    textLine,
  ]
    .filter((line): line is string => line !== undefined)
    .join('\n');
}

function logSkillChoiceDecision({
  decisions,
  reads,
  reason,
  result,
  selectedDecision,
  textReads = [],
}: {
  decisions: readonly SkillPickDecision[];
  reads: readonly FixedSkillNumberRead[];
  reason: string;
  result: string;
  selectedDecision?: SkillPickDecision;
  textReads?: readonly FixedSkillTextRead[];
}): void {
  const activeSkillCount = decisions[0]?.context.activeSkills.size ?? 0;
  const tuning = decisions[0]?.context.tuning;
  const tuningText = tuning
    ? `tuning: offense=${formatSkillScore(
        tuning.offenseDefenseBalance,
      )}, rerollAggression=${formatSkillScore(
        tuning.rerollAggression,
      )}, rerollThreshold=${formatSkillScore(tuning.rerollThreshold)}`
    : undefined;
  const selectedText = selectedDecision
    ? `selected: ${formatSkillDecisionName(selectedDecision)}, pick=${formatSkillScore(
        selectedDecision.pickWeight,
      )}, reroll=${formatSkillScore(selectedDecision.rerollWeight)}, decision=${formatSkillDecisionIntent(
        selectedDecision,
      )}`
    : undefined;

  console.log(
    [
      '================ skill choice ================',
      `active skills: ${activeSkillCount}`,
      tuningText,
      'offered skills:',
      ...reads.map((read, index) => formatSkillDecisionLine(read, index, decisions, textReads)),
      selectedText,
      `result: ${result}`,
      `reason: ${reason}`,
    ]
      .filter((line): line is string => line !== undefined)
      .join('\n'),
  );
}

function findReroll(screen: ScreenCapture, rerollNeedle?: Needle): FindRes | undefined {
  if (!rerollNeedle) {
    return;
  }

  const [found] = findAllInScreen(screen, rerollNeedle, { maxResults: 1 });
  return found;
}

async function clickFirstFoundAction(screen: ScreenCapture, needle?: Needle): Promise<boolean> {
  if (!needle) {
    return false;
  }

  const [found] = findAllInScreen(screen, needle, { maxResults: 1 });
  if (!found) {
    return false;
  }

  console.log(`found: ${needleDisplayName(needle.name)}, score: ${found.score?.toFixed(3)}`);
  await clickFound(found);
  return true;
}

async function clickEnabledActionNeedle(
  screen: ScreenCapture,
  runState: SkillRunState,
  needleKey: string,
  needle?: Needle,
): Promise<boolean> {
  if (!isActionNeedleEnabled(runState, needleKey)) {
    return false;
  }

  return clickFirstFoundAction(screen, needle);
}

function enabledActionNeedle(
  runState: SkillRunState,
  needleKey: string,
  needle?: Needle,
): Needle | undefined {
  return isActionNeedleEnabled(runState, needleKey) ? needle : undefined;
}

function findFirstNeedleMatch(
  screen: ScreenCapture,
  needles: readonly (Needle | undefined)[],
): { needle: Needle; found: FindRes } | undefined {
  for (const needle of needles) {
    if (!needle) {
      continue;
    }

    const [found] = findAllInScreen(screen, needle, { maxResults: 1 });
    if (found) {
      return { needle, found };
    }
  }

  return;
}

async function handleCloseOffer(
  screen: ScreenCapture,
  runState: SkillRunState,
  needles: ScrcpyActionNeedles,
): Promise<boolean> {
  const closeOfferMatch = findFirstNeedleMatch(screen, [
    enabledActionNeedle(runState, 'closeOffer1', needles.closeOffer1),
    enabledActionNeedle(runState, 'closeOffer2', needles.closeOffer2),
    enabledActionNeedle(runState, 'closeOffer3', needles.closeOffer3),
    enabledActionNeedle(runState, 'offerBlacksmiths', needles.offerBlacksmiths),
    enabledActionNeedle(runState, 'offerJourneyman', needles.offerJourneyman),
  ]);
  if (!closeOfferMatch) {
    return false;
  }

  console.log(
    `found: ${needleDisplayName(closeOfferMatch.needle.name)}, score: ${closeOfferMatch.found.score?.toFixed(3)}`,
  );

  if (await clickEnabledActionNeedle(screen, runState, 'closeButton', needles.closeButton)) {
    return true;
  }

  console.warn('close offer is visible, but close_button was not found');
  return true;
}

async function handleScrcpyActionNeedles(
  screen: ScreenCapture,
  runState: SkillRunState,
  needles: ScrcpyActionNeedles,
): Promise<boolean> {
  if (await clickEnabledActionNeedle(screen, runState, 'loot2', needles.loot2)) {
    await setTimeout(LOOT_2_AFTER_CLICK_DELAY_MS);
    return true;
  }

  if (await handleCloseOffer(screen, runState, needles)) {
    return true;
  }

  if (
    await clickEnabledActionNeedle(
      screen,
      runState,
      'questionMarkTreasure',
      needles.questionMarkTreasure,
    )
  ) {
    return true;
  }

  if (
    await clickEnabledActionNeedle(screen, runState, 'rewardDarksteel', needles.rewardDarksteel)
  ) {
    return true;
  }

  if (await clickEnabledActionNeedle(screen, runState, 'rewardOrbs', needles.rewardOrbs)) {
    return true;
  }

  if (await clickEnabledActionNeedle(screen, runState, 'rewardRage', needles.rewardRage)) {
    return true;
  }

  if (await clickEnabledActionNeedle(screen, runState, 'rewardRubies', needles.rewardRubies)) {
    return true;
  }

  if (await clickEnabledActionNeedle(screen, runState, 'pvpOk', needles.pvpOk)) {
    return true;
  }

  if (
    AUTO_CLICK_RETRY &&
    (await clickEnabledActionNeedle(screen, runState, 'retry', needles.retry))
  ) {
    return true;
  }

  if (ENABLE_RUINS) {
    if (await clickEnabledActionNeedle(screen, runState, 'ruinsWorld', needles.ruinsWorld)) {
      return true;
    }

    if (await clickEnabledActionNeedle(screen, runState, 'ruinsEnter', needles.ruinsEnter)) {
      return true;
    }

    if (
      await clickEnabledActionNeedle(screen, runState, 'ruinsArrowDown', needles.ruinsArrowDown)
    ) {
      return true;
    }

    if (await clickEnabledActionNeedle(screen, runState, 'ruinsToDepth', needles.ruinsToDepth)) {
      return true;
    }

    if (await clickEnabledActionNeedle(screen, runState, 'ruinsYes', needles.ruinsYes)) {
      return true;
    }
  }

  return clickEnabledActionNeedle(screen, runState, 'start', needles.start);
}

function createSkillRarityDebugAnnotation(
  screen: ScreenCapture,
  matches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
  textReads: readonly FixedSkillTextRead[],
): Canvas {
  const annotated = createCanvas(screen.canvas.width, screen.canvas.height);
  const ctx = annotated.getContext('2d');
  ctx.drawImage(screen.canvas, 0, 0);
  ctx.lineWidth = 3;
  ctx.font = '18px sans-serif';

  for (const { needle, found } of matches) {
    const rect = foundRelativeToScreen(screen, found);
    const label = `${needleDisplayName(needle.name)} ${found.score?.toFixed(3)}`;
    ctx.strokeStyle = '#00d1ff';
    ctx.fillStyle = '#00d1ff';
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillText(label, rect.x, Math.max(18, rect.y - 8));
  }

  for (const [index, rect] of SKILL_NUMBER_RECTS_IN_SCREENSHOT.entries()) {
    const read = reads[index];
    const label = `number ${index + 1}: ${read?.rawNumber || '?'}`;
    ctx.strokeStyle = '#ffea00';
    ctx.fillStyle = '#ffea00';
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillText(label, rect.x, Math.max(18, rect.y - 8));
  }

  for (const [index, rect] of SKILL_TEXT_RECTS_IN_SCREENSHOT.entries()) {
    const read = textReads[index];
    const score = read?.match?.score;
    const label = `text ${index + 1}: ${score === undefined ? '?' : score.toFixed(2)}`;
    ctx.strokeStyle = '#66ff66';
    ctx.fillStyle = '#66ff66';
    ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillText(label, rect.x, Math.max(18, rect.y - 8));
  }

  return annotated;
}

async function saveSkillRarityDebugScreenshots(
  screen: ScreenCapture,
  matches: readonly SkillRarityMatch[],
  allMatches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
  textReads: readonly FixedSkillTextRead[],
  startedAt: number,
): Promise<void> {
  if (
    !DEBUG_SKILL_RARITY_SCREENSHOTS ||
    matches.length === 0 ||
    debugSkillRarityScreenshotCount >= DEBUG_SKILL_RARITY_MAX_SCREENSHOTS
  ) {
    return;
  }

  const frameName = frameDebugName(startedAt);
  debugSkillRarityScreenshotCount += 1;
  const frameDir = path.join(DEBUG_SKILL_RARITY_SCREENSHOTS_DIR, frameName);
  const expectedSkillNumberRarity = selectedSkillRarity(matches);
  await fs.mkdir(frameDir, { recursive: true });
  await saveCanvasPng(
    path.join(frameDir, `${frameName}_annotated.png`),
    createSkillRarityDebugAnnotation(screen, matches, reads, textReads),
  );

  const metadata = {
    frame: frameName,
    capturedAt: new Date(startedAt).toISOString(),
    screenRegion: SCREEN_REGION,
    selectedRarity: matches[0]?.needle.name,
    expectedSkillNumberRarity,
    numberReads: reads.map((read, index) => ({
      index: index + 1,
      rawNumber: read.rawNumber,
      number: read.number,
      rect: read.rect,
      rectInSavedScreenshot: SKILL_NUMBER_RECTS_IN_SCREENSHOT[index],
      attempts: read.attempts.map((attempt) => ({
        rawNumber: attempt.rawNumber,
        number: parseFixedSkillNumber(attempt.rawNumber, expectedSkillNumberRarity),
        rect: attempt.rect,
        rectInSavedScreenshot: {
          ...attempt.rect,
          x: attempt.rect.x - screen.x,
          y: attempt.rect.y - screen.y,
        },
        options: attempt.options,
      })),
    })),
    textReads: textReads.map((read, index) => ({
      index: index + 1,
      rawText: read.rawText,
      rect: read.rect,
      rectInSavedScreenshot: SKILL_TEXT_RECTS_IN_SCREENSHOT[index],
      match: read.match
        ? {
            catalogIndex: read.match.entry.index,
            margin: read.match.margin,
            rarity: read.match.entry.rarity,
            runnerUpScore: read.match.runnerUpScore,
            score: read.match.score,
            text: read.match.entry.text,
          }
        : undefined,
      attempts: read.attempts.map((attempt) => ({
        rawText: attempt.rawText,
        rect: attempt.rect,
        rectInSavedScreenshot: {
          ...attempt.rect,
          x: attempt.rect.x - screen.x,
          y: attempt.rect.y - screen.y,
        },
        options: attempt.options,
        match: attempt.match
          ? {
              catalogIndex: attempt.match.entry.index,
              margin: attempt.match.margin,
              rarity: attempt.match.entry.rarity,
              runnerUpScore: attempt.match.runnerUpScore,
              score: attempt.match.score,
              text: attempt.match.entry.text,
            }
          : undefined,
      })),
    })),
    matches: matches.map(({ needle, found }) => ({
      needle: needle.name,
      score: found.score,
      rect: found,
      rectInSavedScreenshot: foundRelativeToScreen(screen, found),
    })),
    allMatches: allMatches.map(({ needle, found }) => ({
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
}

async function handleFixedSkillChoice(
  screen: ScreenCapture,
  rarityMatches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
  textReads: readonly FixedSkillTextRead[],
  strategy: SkillStrategy,
  runState: SkillRunState,
  rerollNeedle?: Needle,
): Promise<boolean> {
  const bestRarityMatch = rarityMatches[0];
  if (!bestRarityMatch) {
    return false;
  }

  const rarity = needleDisplayName(bestRarityMatch.needle.name);
  if (!reads.some((read) => read.rawNumber.length > 0)) {
    return false;
  }

  const decisions = evaluateSkillCandidates(rarityMatches, reads, strategy, runState);

  if (reads.some((read) => read.number === undefined)) {
    logSkillChoiceDecision({
      decisions,
      reads,
      result: 'not clicking',
      reason: `${rarity} OCR incomplete`,
      textReads,
    });
    return true;
  }

  const nonRerollDecision = chooseBestNonRerollSkill(decisions);
  if (nonRerollDecision) {
    const bestNumber = nonRerollDecision.candidate.read.number;
    if (bestNumber === undefined) {
      return true;
    }

    logSkillChoiceDecision({
      decisions,
      reads,
      result: `pick ${formatSkillDecisionName(nonRerollDecision)}`,
      reason: `${rarity} highest-weight visible skill marked pick`,
      selectedDecision: nonRerollDecision,
      textReads,
    });

    await clickScreenPoint(skillNumberClickPoint(nonRerollDecision.candidate.read));
    markSkillPicked(strategy, runState, nonRerollDecision.context);
    return true;
  }

  const rerollFound = findReroll(screen, rerollNeedle);
  if (rerollFound) {
    logSkillChoiceDecision({
      decisions,
      reads,
      result: `reroll, score=${rerollFound.score?.toFixed(3) ?? '(unknown)'}`,
      reason: `${rarity} all visible skills allow reroll and reroll needle is visible`,
      textReads,
    });
    await clickFound(rerollFound);
    return true;
  }

  const decision = chooseBestSkill(decisions);
  if (!decision) {
    return true;
  }

  const bestNumber = decision.candidate.read.number;
  if (bestNumber === undefined) {
    return true;
  }

  logSkillChoiceDecision({
    decisions,
    reads,
    result: `pick ${formatSkillDecisionName(decision)}`,
    reason: `${rarity} reroll unavailable, choosing highest-weight visible skill`,
    selectedDecision: decision,
    textReads,
  });

  await clickScreenPoint(skillNumberClickPoint(decision.candidate.read));
  markSkillPicked(strategy, runState, decision.context);
  return true;
}

async function main(): Promise<void> {
  try {
    const needlesByName = await loadNeedlesByNameFromDir(NEEDLE_DIR, NEEDLE_NAME_BY_KEY);
    const needles = ACTIVE_NEEDLES.map((name) => needlesByName[name]);
    const skillRarityNeedles = await loadSkillRarityNeedles();
    const skillTextCatalog = MATCH_SKILL_TEXTS
      ? await loadSkillTextCatalog(SKILL_TEXT_CATALOG_PATH)
      : [];
    const skillRunState = createSkillRunState(GAME_MODE, { ruins: ENABLE_RUINS });
    const rerollNeedle = await loadRerollNeedle();
    const scrcpyActionNeedles = await loadScrcpyActionNeedles();

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
      const screen = await captureScreenWithRetry(SCREEN_REGION);
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
        const handledScrcpyAction = await handleScrcpyActionNeedles(
          screen,
          skillRunState,
          scrcpyActionNeedles,
        );
        let handledSkillChoice = false;

        if (!handledScrcpyAction) {
          const allSkillRarityMatches = findSkillRarityMatches(screen, skillRarityNeedles);
          const skillRarityMatches = selectSkillRarityMatches(allSkillRarityMatches);
          const skillRarity = selectedSkillRarity(skillRarityMatches);
          const skillNumberReads =
            skillRarityMatches.length > 0 ? await readFixedSkillNumbers(screen, skillRarity) : [];
          const skillTextReads =
            skillRarityMatches.length > 0
              ? await readFixedSkillTexts(screen, skillRarity, skillTextCatalog)
              : [];
          await recordSkillTextMatches(skillNumberReads, skillTextReads, skillRarity);
          await saveSkillRarityDebugScreenshots(
            screen,
            skillRarityMatches,
            allSkillRarityMatches,
            skillNumberReads,
            skillTextReads,
            startedAt,
          );

          handledSkillChoice = await handleFixedSkillChoice(
            screen,
            skillRarityMatches,
            skillNumberReads,
            skillTextReads,
            skillStrategy,
            skillRunState,
            rerollNeedle,
          );
        }

        if (!handledScrcpyAction && !handledSkillChoice) {
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
