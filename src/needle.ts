import cvReady from '@techstark/opencv-js';
import fs from 'node:fs';
import path from 'node:path';
import { createCanvas, loadImage, type Canvas, type ImageData as CanvasImageData } from 'canvas';
import { clickAt } from './click.js';
import screenshot from 'screenshot-desktop';

const MATCH_THRESHOLD = 0.9;
const scaleFactor = 0.5; // adjust if retina / HiDPI
const DEBUG_CROP_PATH = 'debug-crop.png';
const NEEDLE_MANIFEST_FILE = 'needles.json';
const NEEDLE_IMAGE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

const cv: any = await cvReady;
const result = new cv.Mat();
const emptyMask = new cv.Mat();

export interface Needle {
  name: string;
  path: string;
  gray: any;
  mask?: any;
  w: number;
  h: number;
  matchThreshold?: number;
  maxResults?: number;
  overlapThreshold?: number;
}

export interface FindRes {
  x: number;
  y: number;
  w: number;
  h: number;
  score?: number;
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface ScreenCapture {
  canvas: Canvas;
  gray: any;
  x: number;
  y: number;
  release(): void;
}

export interface FindAllOptions {
  threshold?: number;
  maxResults?: number;
  overlapThreshold?: number;
}

export interface NeedleSettings {
  matchThreshold?: number;
  maxResults?: number;
  overlapThreshold?: number;
  maskIgnoreRects?: Rect[];
}

export interface NeedleManifest {
  defaults?: NeedleSettings;
  needles?: Record<string, NeedleSettings>;
}

export interface LoadNeedlesOptions {
  names?: readonly string[];
}

export type NeedleNameByKey = Record<string, string>;

export type NeedlesByName<T extends NeedleNameByKey> = {
  [K in keyof T]: Needle;
};

function matFromCanvasImageData(imageData: CanvasImageData): any {
  const mat = new cv.Mat(imageData.height, imageData.width, cv.CV_8UC4);
  const src = imageData.data as unknown as Uint8ClampedArray;
  const view = new Uint8Array(src.buffer, src.byteOffset, src.byteLength);
  (mat.data as Uint8Array).set(view);
  return mat;
}

export async function matFromBuffer(buf: Buffer) {
  const img = await loadImage(buf);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height) as unknown as CanvasImageData;
  const mat = matFromCanvasImageData(imageData);
  return { mat, canvas, ctx, w: img.width, h: img.height };
}

function parseMatchThresholdFromPath(needlePath: string): number | undefined {
  const ext = path.extname(needlePath);
  const stem = path.basename(needlePath, ext);
  const match = stem.match(/(?:^|_)(0(?:[_.]\d+)?|1(?:[_.]0+)?|1)$/);
  if (!match) {
    return;
  }

  const threshold = Number(match[1]!.replace('_', '.'));
  if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1) {
    return;
  }

  return threshold;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function optionalNumberInRange(
  value: unknown,
  source: string,
  field: string,
  min: number,
  max: number,
): number | undefined {
  if (value === undefined) {
    return;
  }

  if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${source}.${field} must be a number between ${min} and ${max}`);
  }

  return value;
}

function optionalPositiveInteger(
  value: unknown,
  source: string,
  field: string,
): number | undefined {
  if (value === undefined) {
    return;
  }

  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) {
    throw new Error(`${source}.${field} must be a positive integer`);
  }

  return value;
}

function parseRect(value: unknown, source: string): Rect {
  if (!isRecord(value)) {
    throw new Error(`${source} must be an object`);
  }

  return {
    x: optionalNumberInRange(value.x, source, 'x', 0, Number.MAX_SAFE_INTEGER) ?? 0,
    y: optionalNumberInRange(value.y, source, 'y', 0, Number.MAX_SAFE_INTEGER) ?? 0,
    w: optionalNumberInRange(value.w, source, 'w', 1, Number.MAX_SAFE_INTEGER) ?? 1,
    h: optionalNumberInRange(value.h, source, 'h', 1, Number.MAX_SAFE_INTEGER) ?? 1,
  };
}

function optionalRectArray(value: unknown, source: string, field: string): Rect[] | undefined {
  if (value === undefined) {
    return;
  }

  if (!Array.isArray(value)) {
    throw new Error(`${source}.${field} must be an array`);
  }

  return value.map((rect, index) => parseRect(rect, `${source}.${field}[${index}]`));
}

function uniqueSortedValues(values: readonly string[]): string[] {
  return [...new Set(values)].sort();
}

function assertRequestedNeedlesExist(
  requested: readonly string[],
  available: readonly string[],
): void {
  const availableSet = new Set(available);
  const missing = requested.filter((name) => !availableSet.has(name));
  if (missing.length > 0) {
    throw new Error(`Needle files not found: ${missing.join(', ')}`);
  }
}

function parseNeedleSettings(value: unknown, source: string): NeedleSettings {
  if (value === undefined) {
    return {};
  }

  if (!isRecord(value)) {
    throw new Error(`${source} must be an object`);
  }

  return {
    matchThreshold: optionalNumberInRange(value.matchThreshold, source, 'matchThreshold', 0, 1),
    maxResults: optionalPositiveInteger(value.maxResults, source, 'maxResults'),
    overlapThreshold: optionalNumberInRange(
      value.overlapThreshold,
      source,
      'overlapThreshold',
      0,
      1,
    ),
    maskIgnoreRects: optionalRectArray(value.maskIgnoreRects, source, 'maskIgnoreRects'),
  };
}

function readNeedleManifest(needleDir: string): NeedleManifest {
  const manifestPath = path.join(needleDir, NEEDLE_MANIFEST_FILE);
  if (!fs.existsSync(manifestPath)) {
    return {};
  }

  const raw = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as unknown;
  if (!isRecord(raw)) {
    throw new Error(`${manifestPath} must contain a JSON object`);
  }

  const needles: Record<string, NeedleSettings> = {};
  if (raw.needles !== undefined) {
    if (!isRecord(raw.needles)) {
      throw new Error(`${manifestPath}.needles must be an object`);
    }

    for (const [file, settings] of Object.entries(raw.needles)) {
      needles[file] = parseNeedleSettings(settings, `${manifestPath}.needles.${file}`);
    }
  }

  return {
    defaults: parseNeedleSettings(raw.defaults, `${manifestPath}.defaults`),
    needles,
  };
}

function isNeedleImage(file: string): boolean {
  return NEEDLE_IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase());
}

function mergeNeedleSettings(
  defaults: NeedleSettings | undefined,
  override: NeedleSettings | undefined,
): NeedleSettings {
  return {
    ...defaults,
    ...override,
  };
}

function buildTemplateMask(width: number, height: number, ignoreRects: readonly Rect[]): any {
  const maskCanvas = createCanvas(width, height);
  const maskCtx = maskCanvas.getContext('2d');
  maskCtx.fillStyle = 'white';
  maskCtx.fillRect(0, 0, width, height);
  maskCtx.fillStyle = 'black';

  for (const rect of ignoreRects) {
    maskCtx.fillRect(rect.x, rect.y, rect.w, rect.h);
  }

  const imageData = maskCtx.getImageData(0, 0, width, height) as unknown as CanvasImageData;
  const rgba = matFromCanvasImageData(imageData);
  const gray = new cv.Mat();
  cv.cvtColor(rgba, gray, cv.COLOR_RGBA2GRAY);
  rgba.delete();
  return gray;
}

function templateMatchMethod(n: Needle): number {
  return n.mask ? cv.TM_CCORR_NORMED : cv.TM_CCOEFF_NORMED;
}

function matchTemplate(screen: ScreenCapture, n: Needle): void {
  if (n.mask) {
    cv.matchTemplate(screen.gray, n.gray, result, templateMatchMethod(n), n.mask);
    return;
  }

  cv.matchTemplate(screen.gray, n.gray, result, templateMatchMethod(n));
}

export async function loadNeedle(
  needlePath: string,
  settings: NeedleSettings = {},
): Promise<Needle> {
  const buf = fs.readFileSync(needlePath);
  const { mat } = await matFromBuffer(buf);
  const gray = new cv.Mat();
  cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);
  mat.delete();
  const mask = settings.maskIgnoreRects?.length
    ? buildTemplateMask(gray.cols, gray.rows, settings.maskIgnoreRects)
    : undefined;

  return {
    name: path.basename(needlePath),
    path: needlePath,
    gray,
    mask,
    w: gray.cols,
    h: gray.rows,
    matchThreshold: settings.matchThreshold ?? parseMatchThresholdFromPath(needlePath),
    maxResults: settings.maxResults,
    overlapThreshold: settings.overlapThreshold,
  };
}

export async function loadNeedlesFromDir(
  needleDir: string,
  options: LoadNeedlesOptions = {},
): Promise<Needle[]> {
  const manifest = readNeedleManifest(needleDir);
  let files = fs.readdirSync(needleDir).filter(isNeedleImage).sort();
  if (options.names) {
    const requested = uniqueSortedValues(options.names);
    assertRequestedNeedlesExist(requested, files);
    const requestedSet = new Set(requested);
    files = files.filter((file) => requestedSet.has(file));
  }

  const needles: Needle[] = [];

  for (const file of files) {
    const settings = mergeNeedleSettings(manifest.defaults, manifest.needles?.[file]);
    needles.push(await loadNeedle(path.join(needleDir, file), settings));
  }

  return needles;
}

export async function loadNeedlesByNameFromDir<T extends NeedleNameByKey>(
  needleDir: string,
  needleNameByKey: T,
): Promise<NeedlesByName<T>> {
  const manifest = readNeedleManifest(needleDir);
  const availableFiles = fs.readdirSync(needleDir).filter(isNeedleImage).sort();
  const requestedFiles = uniqueSortedValues(Object.values(needleNameByKey));
  assertRequestedNeedlesExist(requestedFiles, availableFiles);

  const needlesByName: Partial<NeedlesByName<T>> = {};
  for (const [key, file] of Object.entries(needleNameByKey) as Array<[keyof T, T[keyof T]]>) {
    const settings = mergeNeedleSettings(manifest.defaults, manifest.needles?.[file]);
    needlesByName[key] = await loadNeedle(path.join(needleDir, file), settings);
  }

  return needlesByName as NeedlesByName<T>;
}

export async function functionLoadNeedles(): Promise<void> {
  console.log('a');
}

export async function captureScreen(region?: Rect): Promise<ScreenCapture> {
  const screenBuf = await screenshot({ format: 'png' });
  const { mat: screenMat, canvas: screenCanvas } = await matFromBuffer(screenBuf);
  let canvas = screenCanvas;
  let grayScreen = new cv.Mat();
  cv.cvtColor(screenMat, grayScreen, cv.COLOR_RGBA2GRAY);

  if (region) {
    const cropCanvas = createCanvas(region.w, region.h);
    const cropCtx = cropCanvas.getContext('2d');
    cropCtx.drawImage(
      screenCanvas,
      region.x,
      region.y,
      region.w,
      region.h,
      0,
      0,
      region.w,
      region.h,
    );
    fs.writeFileSync(DEBUG_CROP_PATH, cropCanvas.toBuffer('image/png'));
    canvas = cropCanvas;

    const crop = grayScreen.roi(new cv.Rect(region.x, region.y, region.w, region.h));
    grayScreen.delete();
    grayScreen = crop.clone();
    crop.delete();
    screenCanvas.width = screenCanvas.width; // clear full-size source canvas
  }

  screenMat.delete();

  return {
    canvas,
    gray: grayScreen,
    x: region?.x ?? 0,
    y: region?.y ?? 0,
    release() {
      grayScreen.delete();
      canvas.width = canvas.width; // clear
    },
  };
}

export function findInScreen(screen: ScreenCapture, n: Needle): FindRes | undefined {
  if (screen.gray.cols < n.w || screen.gray.rows < n.h) {
    return;
  }

  matchTemplate(screen, n);
  const { maxLoc, maxVal } = cv.minMaxLoc(result, emptyMask);
  const threshold = n.matchThreshold ?? MATCH_THRESHOLD;

  if (maxVal < threshold) {
    return;
  }

  return {
    x: Number(maxLoc.x) + screen.x,
    y: Number(maxLoc.y) + screen.y,
    w: Number(n.w),
    h: Number(n.h),
    score: Number(maxVal),
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

export function findAllInScreen(
  screen: ScreenCapture,
  n: Needle,
  options: FindAllOptions = {},
): FindRes[] {
  if (screen.gray.cols < n.w || screen.gray.rows < n.h) {
    return [];
  }

  const threshold = options.threshold ?? n.matchThreshold ?? MATCH_THRESHOLD;
  const maxResults = options.maxResults ?? n.maxResults ?? 50;
  const overlapThreshold = options.overlapThreshold ?? n.overlapThreshold ?? 0.3;
  const candidates: FindRes[] = [];

  matchTemplate(screen, n);

  const scores = result.data32F as Float32Array;
  for (let y = 0; y < result.rows; y += 1) {
    const rowOffset = y * result.cols;
    for (let x = 0; x < result.cols; x += 1) {
      const score = scores[rowOffset + x]!;
      if (!Number.isFinite(score) || score < threshold) {
        continue;
      }

      candidates.push({
        x: x + screen.x,
        y: y + screen.y,
        w: Number(n.w),
        h: Number(n.h),
        score,
      });
    }
  }

  candidates.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const matches: FindRes[] = [];
  for (const candidate of candidates) {
    if (matches.length >= maxResults) {
      break;
    }

    const alreadyCovered = matches.some(
      (match) => overlapRatio(candidate, match) > overlapThreshold,
    );
    if (!alreadyCovered) {
      matches.push(candidate);
    }
  }

  return matches;
}

export async function clickFound(found: FindRes): Promise<void> {
  await clickScreenPoint({
    x: found.x + found.w / 2,
    y: found.y + found.h / 2,
  });
}

export async function clickScreenPoint(point: Point): Promise<void> {
  const x = Math.round(point.x * scaleFactor);
  const y = Math.round(point.y * scaleFactor);
  await clickAt(x, y);
}

export async function findAndClickInScreen(screen: ScreenCapture, n: Needle): Promise<boolean> {
  const found = findInScreen(screen, n);
  if (!found) {
    return false;
  }

  await clickFound(found);
  console.log(`clicked: ${n.path}`);
  return true;
}

export const findAndClick = async (n: Needle) => {
  const screen = await captureScreen();
  try {
    await findAndClickInScreen(screen, n);
  } finally {
    screen.release();
  }
};
