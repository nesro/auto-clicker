import cvReady from '@techstark/opencv-js';
import fs from 'node:fs';
import { createCanvas, loadImage, type ImageData as CanvasImageData } from 'canvas';
import { clickAt } from './click.js';
import screenshot from 'screenshot-desktop';

const MATCH_THRESHOLD = 0.9;
const scaleFactor = 0.5; // adjust if retina / HiDPI

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
}

export interface ScreenCapture {
  gray: any;
  release(): void;
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

export async function captureScreen(): Promise<ScreenCapture> {
  const screenBuf = await screenshot({ format: 'png' });
  const { mat: screenMat, canvas: screenCanvas } = await matFromBuffer(screenBuf);
  const grayScreen = new cv.Mat();
  cv.cvtColor(screenMat, grayScreen, cv.COLOR_RGBA2GRAY);

  screenMat.delete();
  screenCanvas.width = screenCanvas.width; // clear

  return {
    gray: grayScreen,
    release() {
      grayScreen.delete();
    },
  };
}

export function findInScreen(screen: ScreenCapture, n: Needle): FindRes | undefined {
  cv.matchTemplate(screen.gray, n.gray, result, cv.TM_CCOEFF_NORMED);
  const { maxLoc, maxVal } = cv.minMaxLoc(result, emptyMask);

  if (maxVal < MATCH_THRESHOLD) {
    return;
  }

  return {
    x: Number(maxLoc.x),
    y: Number(maxLoc.y),
    w: Number(n.w),
    h: Number(n.h),
  };
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
