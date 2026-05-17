import fs from 'node:fs/promises';

import { readNumberInScreen, type OcrImageOptions } from './ocr.js';
import {
  findAllInScreen,
  type FindRes,
  type Needle,
  type Rect,
  type ScreenCapture,
} from './needle.js';

const MIN_SKILL_NUMBER = 1;
const MAX_SKILL_NUMBER = 300;

export interface ScreenPoint {
  x: number;
  y: number;
}

export interface SkillChoiceSlot {
  name: string;
  numberRect: Rect;
  clickPoint: ScreenPoint;
}

export interface SkillChoiceLocator {
  needle: Needle;
  numberRect?: Rect;
  clickOffset?: ScreenPoint;
}

export interface SkillWeights {
  threshold: number;
  defaultWeight: number;
  weights: Map<number, number>;
}

export interface SkillChoice {
  slot: SkillChoiceSlot;
  rawNumber: string;
  skillNumber: number;
  weight: number;
}

export interface SkillChoiceReadResult {
  slot: SkillChoiceSlot;
  rawNumber: string;
  skillNumber?: number;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requiredFiniteNumber(value: unknown, source: string): number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${source} must be a finite number`);
  }

  return value;
}

function optionalFiniteNumber(value: unknown, source: string, fallback: number): number {
  if (value === undefined) {
    return fallback;
  }

  return requiredFiniteNumber(value, source);
}

function parseSkillNumber(rawNumber: string): number | undefined {
  if (!/^\d+$/.test(rawNumber)) {
    return;
  }

  const skillNumber = Number(rawNumber);
  if (
    !Number.isInteger(skillNumber) ||
    skillNumber < MIN_SKILL_NUMBER ||
    skillNumber > MAX_SKILL_NUMBER
  ) {
    return;
  }

  return skillNumber;
}

function rectInFound(found: FindRes, relativeRect?: Rect): Rect {
  return relativeRect
    ? {
        x: found.x + relativeRect.x,
        y: found.y + relativeRect.y,
        w: relativeRect.w,
        h: relativeRect.h,
      }
    : found;
}

function clickPointInFound(found: FindRes, clickOffset?: ScreenPoint): ScreenPoint {
  return clickOffset
    ? {
        x: found.x + clickOffset.x,
        y: found.y + clickOffset.y,
      }
    : {
        x: found.x + found.w / 2,
        y: found.y + found.h / 2,
      };
}

function overlapRatio(a: Rect, b: Rect): number {
  const left = Math.max(a.x, b.x);
  const top = Math.max(a.y, b.y);
  const right = Math.min(a.x + a.w, b.x + b.w);
  const bottom = Math.min(a.y + a.h, b.y + b.h);
  const intersection = Math.max(0, right - left) * Math.max(0, bottom - top);

  if (intersection === 0) {
    return 0;
  }

  return intersection / Math.min(a.w * a.h, b.w * b.h);
}

function positionName(index: number): string {
  return ['left', 'middle', 'right'][index] ?? `slot-${index + 1}`;
}

export function findSkillChoiceSlots(
  screen: ScreenCapture,
  locators: readonly SkillChoiceLocator[],
  maxSlots = 3,
): SkillChoiceSlot[] {
  const candidates: Array<SkillChoiceSlot & { score: number }> = [];

  for (const locator of locators) {
    const foundMatches = findAllInScreen(screen, locator.needle);
    for (const found of foundMatches) {
      candidates.push({
        name: locator.needle.name,
        numberRect: rectInFound(found, locator.numberRect),
        clickPoint: clickPointInFound(found, locator.clickOffset),
        score: found.score ?? 0,
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  const deduped: Array<SkillChoiceSlot & { score: number }> = [];
  for (const candidate of candidates) {
    if (deduped.length >= maxSlots) {
      break;
    }

    if (!deduped.some((slot) => overlapRatio(candidate.numberRect, slot.numberRect) > 0.5)) {
      deduped.push(candidate);
    }
  }

  return deduped
    .sort((a, b) => a.numberRect.x - b.numberRect.x)
    .map((slot, index) => ({
      name: positionName(index),
      numberRect: slot.numberRect,
      clickPoint: slot.clickPoint,
    }));
}

function parseWeights(value: unknown, source: string): Map<number, number> {
  if (value === undefined) {
    return new Map();
  }

  if (!isRecord(value)) {
    throw new Error(`${source} must be an object keyed by skill number`);
  }

  const weights = new Map<number, number>();
  for (const [skillNumberText, weightValue] of Object.entries(value)) {
    const skillNumber = parseSkillNumber(skillNumberText);
    if (skillNumber === undefined) {
      throw new Error(`${source}.${skillNumberText} must be a skill number from 1 to 300`);
    }

    weights.set(skillNumber, requiredFiniteNumber(weightValue, `${source}.${skillNumberText}`));
  }

  return weights;
}

export async function loadSkillWeights(configPath: string): Promise<SkillWeights> {
  const raw = JSON.parse(await fs.readFile(configPath, 'utf8')) as unknown;
  if (!isRecord(raw)) {
    throw new Error(`${configPath} must contain a JSON object`);
  }

  return {
    threshold: optionalFiniteNumber(raw.threshold, `${configPath}.threshold`, 0),
    defaultWeight: optionalFiniteNumber(raw.defaultWeight, `${configPath}.defaultWeight`, 0),
    weights: parseWeights(raw.weights, `${configPath}.weights`),
  };
}

export async function readSkillChoiceSlots(
  screen: ScreenCapture,
  slots: readonly SkillChoiceSlot[],
  options?: OcrImageOptions,
): Promise<SkillChoiceReadResult[]> {
  const results: SkillChoiceReadResult[] = [];

  for (const slot of slots) {
    const rawNumber = await readNumberInScreen(screen, slot.numberRect, options);
    results.push({
      slot,
      rawNumber,
      skillNumber: parseSkillNumber(rawNumber),
    });
  }

  return results;
}

export function buildSkillChoices(
  readResults: readonly SkillChoiceReadResult[],
  weights: SkillWeights,
): SkillChoice[] {
  return readResults.flatMap((result) => {
    if (result.skillNumber === undefined) {
      return [];
    }

    return [
      {
        slot: result.slot,
        rawNumber: result.rawNumber,
        skillNumber: result.skillNumber,
        weight: weights.weights.get(result.skillNumber) ?? weights.defaultWeight,
      },
    ];
  });
}

export function bestSkillChoice(choices: readonly SkillChoice[]): SkillChoice | undefined {
  return choices.reduce<SkillChoice | undefined>((best, choice) => {
    if (!best || choice.weight > best.weight) {
      return choice;
    }

    return best;
  }, undefined);
}

export function formatSkillChoices(choices: readonly SkillChoice[]): string {
  return choices
    .map((choice) => `${choice.slot.name}: #${choice.skillNumber}=${choice.weight}`)
    .join(', ');
}
