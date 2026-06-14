/*
npx tsx ./src/main.ts
*/

import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createCanvas, type Canvas } from 'canvas';

import { skillWeights } from '../obsidian-knight/skill-weights.js';
import { NEEDLE_NAME_BY_KEY, type NeedleKey } from './generated/needle-names.js';
import { NEEDLE_GROUPS } from './needle-groups.js';
import {
  readNumberInFound,
  readNumberInScreen,
  readTextInFound,
  type OcrImageOptions,
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

const NEEDLE_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles_dung';
const SKILL_NEEDLE_DIR =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles_scrcpy';
const DEBUG_NUMBER_OCR_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/number-ocr';
const DEBUG_SKILL_RARITY_SCREENSHOTS_DIR =
  '/Users/tomasnesrovnal/g/nesro/auto-clicker/debug/skill-rarity-screenshots';

const SCREENSHOT_INTERVAL_MS = 1000;
const SCREEN_REGION: Rect = { x: 1326, y: 122, w: 1680, h: 762 };

const READ_TEXT = false;
const READ_NUMBER = true;
const DEBUG_NUMBER_OCR = false;
const DEBUG_NUMBER_NEEDLE = 'skill_number_rare.png';
const DEBUG_SKILL_RARITY_SCREENSHOTS = true;
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

interface SkillPriorityConfig {
  alwaysPick: readonly number[];
  rerollIfPossible: readonly number[];
}

interface FixedSkillChoiceCandidate {
  index: number;
  read: FixedSkillNumberRead;
  rarityMatch?: SkillRarityMatch;
}

interface SkillPickDecision {
  candidate: FixedSkillChoiceCandidate;
  priorityIndex: number;
  reason: 'alwaysPick' | 'rerollIfPossible' | 'none';
}

interface ScrcpyActionNeedles {
  loot2?: Needle;
  pvpOk?: Needle;
  retry?: Needle;
  start?: Needle;
}

type SkillRarity = 'common' | 'rare' | 'epic';

const SKILL_NUMBER_RECTS_IN_SCREENSHOT: Rect[] = [
  { x: 453, y: 80, w: 43, h: 15 },
  { x: 825, y: 80, w: 43, h: 15 },
  { x: 1196, y: 80, w: 43, h: 15 },
];

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
  matchThreshold: 0.9,
  maxResults: 1,
  overlapThreshold: 0.5,
};
const AUTO_CLICK_RETRY = false;
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function parseSkillPriorityNumber(value: unknown, source: string): number {
  if (
    typeof value !== 'number' ||
    !Number.isInteger(value) ||
    value < MIN_SKILL_NUMBER ||
    value > MAX_SKILL_NUMBER
  ) {
    throw new Error(`${source} must be an integer from ${MIN_SKILL_NUMBER} to ${MAX_SKILL_NUMBER}`);
  }

  return value;
}

function parseSkillPriorityList(value: unknown, source: string): number[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error(`${source} must be an array of skill numbers`);
  }

  return value.map((item, index) => parseSkillPriorityNumber(item, `${source}[${index}]`));
}

function parseSkillPriorityConfig(raw: unknown, source: string): SkillPriorityConfig {
  if (!isRecord(raw)) {
    throw new Error(`${source} must contain an object`);
  }

  return {
    alwaysPick: parseSkillPriorityList(raw.alwaysPick, `${source}.alwaysPick`),
    rerollIfPossible: parseSkillPriorityList(raw.rerollIfPossible, `${source}.rerollIfPossible`),
  };
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

async function loadScrcpyActionNeedles(): Promise<ScrcpyActionNeedles> {
  const [loot2, pvpOk, retry, start] = await Promise.all([
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'loot_2.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'pvp_ok.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'retry.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
    loadOptionalNeedle(path.join(SKILL_NEEDLE_DIR, 'start.png'), SCRCPY_ACTION_NEEDLE_SETTINGS),
  ]);

  return { loot2, pvpOk, retry, start };
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
    return number < 100;
  }

  if (rarity === 'rare' || rarity === 'epic') {
    return rawNumber.length === 3 && number >= 100;
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

function chooseFromPriorityList(
  candidates: readonly FixedSkillChoiceCandidate[],
  priorityList: readonly number[],
  reason: SkillPickDecision['reason'],
): SkillPickDecision | undefined {
  let best: SkillPickDecision | undefined;

  for (const candidate of candidates) {
    const skillNumber = candidate.read.number;
    if (skillNumber === undefined) {
      continue;
    }

    const priorityIndex = priorityList.indexOf(skillNumber);
    if (priorityIndex === -1) {
      continue;
    }

    if (!best || priorityIndex < best.priorityIndex) {
      best = {
        candidate,
        priorityIndex,
        reason,
      };
    }
  }

  return best;
}

function chooseAlwaysPickSkill(
  rarityMatches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
  priorityConfig: SkillPriorityConfig,
): SkillPickDecision | undefined {
  const candidates = fixedSkillChoiceCandidates(rarityMatches, reads);
  return chooseFromPriorityList(candidates, priorityConfig.alwaysPick, 'alwaysPick');
}

function chooseFallbackSkill(
  rarityMatches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
  priorityConfig: SkillPriorityConfig,
): SkillPickDecision | undefined {
  const candidates = fixedSkillChoiceCandidates(rarityMatches, reads);
  const rerollIfPossible = chooseFromPriorityList(
    candidates,
    priorityConfig.rerollIfPossible,
    'rerollIfPossible',
  );
  if (rerollIfPossible) {
    return rerollIfPossible;
  }

  const [fallback] = candidates;
  if (!fallback) {
    return;
  }

  return {
    candidate: fallback,
    priorityIndex: Number.POSITIVE_INFINITY,
    reason: 'none',
  };
}

function skillPriorityCategory(
  skillNumber: number,
  priorityConfig: SkillPriorityConfig,
): SkillPickDecision['reason'] {
  if (priorityConfig.alwaysPick.includes(skillNumber)) {
    return 'alwaysPick';
  }

  if (priorityConfig.rerollIfPossible.includes(skillNumber)) {
    return 'rerollIfPossible';
  }

  return 'none';
}

function formatSkillPriorityStatus(
  reads: readonly FixedSkillNumberRead[],
  priorityConfig: SkillPriorityConfig,
): string {
  return reads
    .map((read) => {
      if (read.number === undefined) {
        return `${read.rawNumber || '(missing)'}=unread`;
      }

      return `${read.number}=${skillPriorityCategory(read.number, priorityConfig)}`;
    })
    .join(', ');
}

function decisionReasonText(decision: SkillPickDecision): string {
  if (decision.reason === 'alwaysPick') {
    return `alwaysPick priority ${decision.priorityIndex + 1}`;
  }

  if (decision.reason === 'rerollIfPossible') {
    return `reroll is unavailable and rerollIfPossible priority ${decision.priorityIndex + 1}`;
  }

  return 'reroll is unavailable and no configured priority matched';
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

async function handleScrcpyActionNeedles(
  screen: ScreenCapture,
  needles: ScrcpyActionNeedles,
): Promise<boolean> {
  if (await clickFirstFoundAction(screen, needles.loot2)) {
    await setTimeout(LOOT_2_AFTER_CLICK_DELAY_MS);
    return true;
  }

  if (await clickFirstFoundAction(screen, needles.pvpOk)) {
    return true;
  }

  if (AUTO_CLICK_RETRY && (await clickFirstFoundAction(screen, needles.retry))) {
    return true;
  }

  return clickFirstFoundAction(screen, needles.start);
}

function createSkillRarityDebugAnnotation(
  screen: ScreenCapture,
  matches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
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

  return annotated;
}

async function saveSkillRarityDebugScreenshots(
  screen: ScreenCapture,
  matches: readonly SkillRarityMatch[],
  allMatches: readonly SkillRarityMatch[],
  reads: readonly FixedSkillNumberRead[],
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
    createSkillRarityDebugAnnotation(screen, matches, reads),
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
  priorityConfig: SkillPriorityConfig,
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

  if (reads.some((read) => read.number === undefined)) {
    console.log(
      `${rarity} skills: ${formatSkillPriorityStatus(
        reads,
        priorityConfig,
      )} - OCR incomplete, not clicking`,
    );
    return true;
  }

  const alwaysPickDecision = chooseAlwaysPickSkill(rarityMatches, reads, priorityConfig);
  if (alwaysPickDecision) {
    const bestNumber = alwaysPickDecision.candidate.read.number;
    if (bestNumber === undefined) {
      return true;
    }

    console.log(
      `${rarity} skills: ${formatSkillPriorityStatus(
        reads,
        priorityConfig,
      )} - choosing ${bestNumber} because ${decisionReasonText(alwaysPickDecision)}`,
    );

    const targetMatch = alwaysPickDecision.candidate.rarityMatch;
    if (targetMatch) {
      await clickFound(targetMatch.found);
    } else {
      const bestRead = alwaysPickDecision.candidate.read;
      await clickScreenPoint({
        x: bestRead.rect.x + bestRead.rect.w / 2,
        y: bestRead.rect.y + bestRead.rect.h / 2,
      });
    }
    return true;
  }

  const rerollFound = findReroll(screen, rerollNeedle);
  if (rerollFound) {
    console.log(
      `${rarity} skills: ${formatSkillPriorityStatus(
        reads,
        priorityConfig,
      )} - rerolling because no alwaysPick skill is available`,
    );
    await clickFound(rerollFound);
    return true;
  }

  const decision = chooseFallbackSkill(rarityMatches, reads, priorityConfig);
  if (!decision) {
    return true;
  }

  const bestNumber = decision.candidate.read.number;
  if (bestNumber === undefined) {
    return true;
  }

  console.log(
    `${rarity} skills: ${formatSkillPriorityStatus(
      reads,
      priorityConfig,
    )} - choosing ${bestNumber} because ${decisionReasonText(decision)}`,
  );

  const targetMatch = decision.candidate.rarityMatch;
  if (targetMatch) {
    await clickFound(targetMatch.found);
  } else {
    const bestRead = decision.candidate.read;
    await clickScreenPoint({
      x: bestRead.rect.x + bestRead.rect.w / 2,
      y: bestRead.rect.y + bestRead.rect.h / 2,
    });
  }
  return true;
}

async function main(): Promise<void> {
  try {
    const needlesByName = await loadNeedlesByNameFromDir(NEEDLE_DIR, NEEDLE_NAME_BY_KEY);
    const needles = ACTIVE_NEEDLES.map((name) => needlesByName[name]);
    const skillRarityNeedles = await loadSkillRarityNeedles();
    const skillPriorityConfig = parseSkillPriorityConfig(
      skillWeights,
      'obsidian-knight/skill-weights.ts:skillWeights',
    );
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
        const handledScrcpyAction = await handleScrcpyActionNeedles(screen, scrcpyActionNeedles);
        let handledSkillChoice = false;

        if (!handledScrcpyAction) {
          const allSkillRarityMatches = findSkillRarityMatches(screen, skillRarityNeedles);
          const skillRarityMatches = selectSkillRarityMatches(allSkillRarityMatches);
          const skillRarity = selectedSkillRarity(skillRarityMatches);
          const skillNumberReads =
            skillRarityMatches.length > 0 ? await readFixedSkillNumbers(screen, skillRarity) : [];
          await saveSkillRarityDebugScreenshots(
            screen,
            skillRarityMatches,
            allSkillRarityMatches,
            skillNumberReads,
            startedAt,
          );

          handledSkillChoice = await handleFixedSkillChoice(
            screen,
            skillRarityMatches,
            skillNumberReads,
            skillPriorityConfig,
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
