import cvReady from '@techstark/opencv-js';
import fs from 'node:fs';
import { createCanvas, loadImage, type Canvas, type ImageData as CanvasImageData } from 'canvas';
import { clickAt } from './click.js';
import screenshot from 'screenshot-desktop';

const MATCH_THRESHOLD = 0.9;
const scaleFactor = 0.5; // adjust if retina / HiDPI
const DEBUG_CROP_PATH = 'debug-crop.png';

const cv: any = await cvReady;
const result = new cv.Mat();
const emptyMask = new cv.Mat();

export interface Needle {
  path: string;
  gray: any;
  w: number;
  h: number;
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

export async function loadNeedle(path: string): Promise<Needle> {
  const buf = fs.readFileSync(path);
  const { mat } = await matFromBuffer(buf);
  const gray = new cv.Mat();
  cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);
  mat.delete();
  return { path, gray, w: gray.cols, h: gray.rows };
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

  cv.matchTemplate(screen.gray, n.gray, result, cv.TM_CCOEFF_NORMED);
  const { maxLoc, maxVal } = cv.minMaxLoc(result, emptyMask);

  if (maxVal < MATCH_THRESHOLD) {
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

  const threshold = options.threshold ?? MATCH_THRESHOLD;
  const maxResults = options.maxResults ?? 50;
  const overlapThreshold = options.overlapThreshold ?? 0.3;
  const candidates: FindRes[] = [];

  cv.matchTemplate(screen.gray, n.gray, result, cv.TM_CCOEFF_NORMED);

  const scores = result.data32F as Float32Array;
  for (let y = 0; y < result.rows; y += 1) {
    const rowOffset = y * result.cols;
    for (let x = 0; x < result.cols; x += 1) {
      const score = scores[rowOffset + x]!;
      if (score < threshold) {
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
  const cx = Math.round((found.x + found.w / 2) * scaleFactor);
  const cy = Math.round((found.y + found.h / 2) * scaleFactor);
  await clickAt(cx, cy);
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
