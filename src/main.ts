/**
 * TODO I need to have a list of previous finds/click so I can make chains
 */

// src/main.ts
import cvReady from '@techstark/opencv-js';
import screenshot from 'screenshot-desktop';
import fs from 'node:fs';
import { createCanvas, loadImage, type ImageData as CanvasImageData } from 'canvas';
import { execFileSync } from 'node:child_process';

const cv: any = await cvReady;

// ---------------- config ----------------
const NEEDLE_PATHS = [
  './needles/dmg.png',
  // './needles/confirm.png',
  // './needles/play.png',
  // add more…
];
const MATCH_THRESHOLD = 0.4;
const scaleFactor = 0.5; // adjust if retina / HiDPI
const clicksPerNeedle = 2;
const SCREENSHOT_INTERVAL = 500; // ms
// ---------------------------------------

function clickAt(x: number, y: number) {
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

async function loadNeedle(path: string) {
  const buf = fs.readFileSync(path);
  const { mat } = await matFromBuffer(buf);
  const gray = new cv.Mat();
  cv.cvtColor(mat, gray, cv.COLOR_RGBA2GRAY);
  mat.delete();
  return { path, gray, w: gray.cols, h: gray.rows };
}

const needles = await Promise.all(NEEDLE_PATHS.map(loadNeedle));
const result = new cv.Mat();
const emptyMask = new cv.Mat();

async function processScreen() {
  try {
    // take screenshot
    const screenBuf = await screenshot({ format: 'png' });
    const { mat: screenMat, canvas: screenCanvas, ctx: screenCtx } = await matFromBuffer(screenBuf);
    const grayScreen = new cv.Mat();
    cv.cvtColor(screenMat, grayScreen, cv.COLOR_RGBA2GRAY);

    // screenCtx.lineWidth = 4;
    // screenCtx.strokeStyle = 'red';

    for (const n of needles) {
      cv.matchTemplate(grayScreen, n.gray, result, cv.TM_CCOEFF_NORMED);
      const { maxLoc, maxVal } = cv.minMaxLoc(result, emptyMask);

      if (maxVal >= MATCH_THRESHOLD) {
        // screenCtx.strokeRect(maxLoc.x, maxLoc.y, n.w, n.h);

        const cx = Math.round((maxLoc.x + n.w / 2) * scaleFactor);
        const cy = Math.round((maxLoc.y + n.h / 2) * scaleFactor);

        for (let i = 0; i < clicksPerNeedle; i++) clickAt(cx, cy);

        console.log(`[FOUND] ${n.path} score=${maxVal.toFixed(3)} clicked at (${cx},${cy})`);
      } else {
        console.log({ n, maxVal });
      }
    }

    // fs.writeFileSync('match.png', screenCanvas.toBuffer('image/png'));

    screenMat.delete();
    grayScreen.delete();
    screenCanvas.width = screenCanvas.width; // clear
  } catch (e) {
    console.error('Error in processScreen:', e);
  }
}

void processScreen();
