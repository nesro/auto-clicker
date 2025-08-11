// src/main.ts
import cvReady from '@techstark/opencv-js';
import screenshot from 'screenshot-desktop';
import fs from 'node:fs';
import robot from 'robotjs';
import { createCanvas, loadImage, type ImageData as CanvasImageData } from 'canvas';
import { execFileSync } from 'node:child_process';

const cv: any = await cvReady; // ✅ 4.11+ usage

export function clickAt(x: number, y: number) {
  // move then click
  execFileSync('cliclick', [`m:${x},${y}`, 'c:.']);
}

function matFromCanvasImageData(imageData: CanvasImageData): any {
  const mat = new cv.Mat(imageData.height, imageData.width, cv.CV_8UC4);
  const src = imageData.data as unknown as Uint8ClampedArray;
  const view = new Uint8Array(src.buffer, src.byteOffset, src.byteLength);
  (mat.data as Uint8Array).set(view);
  return mat;
}

async function matFromBuffer(buf: Buffer) {
  const img = await loadImage(buf);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const imageData = ctx.getImageData(0, 0, img.width, img.height) as unknown as CanvasImageData;
  const mat = matFromCanvasImageData(imageData);
  return { mat, canvas, ctx, w: img.width, h: img.height };
}

(async () => {
  const screenBuf = await screenshot({ format: 'png' });
  fs.writeFileSync('screen.png', screenBuf);

  const { mat: screenMat, canvas: screenCanvas, ctx: screenCtx } = await matFromBuffer(screenBuf);
  const needleBuf = fs.readFileSync('./needles/dmg.png');
  const { mat: needleMat } = await matFromBuffer(needleBuf);

  const grayScreen = new cv.Mat();
  const grayNeedle = new cv.Mat();
  cv.cvtColor(screenMat, grayScreen, cv.COLOR_RGBA2GRAY);
  cv.cvtColor(needleMat, grayNeedle, cv.COLOR_RGBA2GRAY);

  const result = new cv.Mat();
  cv.matchTemplate(grayScreen, grayNeedle, result, cv.TM_CCOEFF_NORMED);

  const emptyMask = new cv.Mat(); // safe to pass
  const { maxLoc, maxVal } = cv.minMaxLoc(result, emptyMask);
  emptyMask.delete();

  screenCtx.lineWidth = 4;
  screenCtx.strokeStyle = 'red';
  screenCtx.strokeRect(maxLoc.x, maxLoc.y, grayNeedle.cols, grayNeedle.rows);

  // const cx = Math.floor(maxLoc.x + grayNeedle.cols / 2);
  // const cy = Math.floor(maxLoc.y + grayNeedle.rows / 2);

  const cx = Math.floor((maxLoc.x + grayNeedle.cols / 2) / 2);
  const cy = Math.floor((maxLoc.y + grayNeedle.rows / 2) / 2);

  clickAt(cx, cy);
  clickAt(cx, cy);
  clickAt(cx, cy);
  clickAt(cx, cy);

  fs.writeFileSync('match.png', screenCanvas.toBuffer('image/png'));

  console.log(
    `cx=${cx},cy=${cy},Best score: ${Number(maxVal).toFixed(3)} at (${maxLoc.x}, ${maxLoc.y})`,
  );

  [screenMat, needleMat, grayScreen, grayNeedle, result].forEach((m: any) => m.delete());
})().catch((e) => console.error('Fatal error:', e));
