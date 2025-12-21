import cvReady from '@techstark/opencv-js';
import fs from 'node:fs';
import { createCanvas, loadImage, type ImageData as CanvasImageData } from 'canvas';

const cv: any = await cvReady;

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
