// npx tsx ./src/main.ts

import { Button, Point, mouse, sleep } from '@nut-tree-fork/nut-js';
import cvReady from '@techstark/opencv-js';
import screenshot from 'screenshot-desktop';
import fs from 'node:fs';
import { createCanvas, loadImage, type ImageData as CanvasImageData } from 'canvas';
import assert from 'node:assert';
import { execFileSync } from 'node:child_process';

const slowClick = false;

/******************** */

const cv: any = await cvReady;

// ---------------- config ----------------
const NEEDLE_PATHS = [
  './needles/tile.png',
  './needles/next-frame.png',
  // './needles/confirm.png',
  // './needles/play.png',
  // add more…
];
const MATCH_THRESHOLD = 0.4;
const scaleFactor = 0.5; // adjust if retina / HiDPI
const clicksPerNeedle = 2;
const SCREENSHOT_INTERVAL = 500; // ms
// ---------------------------------------

mouse.config.autoDelayMs = 0;

async function clickAt(x: number, y: number) {
  if (slowClick) {
    execFileSync('cliclick', [`m:${Math.round(x)},${Math.round(y)}`, 'c:.']);
    return;
  }

  const target = new Point(Math.round(x), Math.round(y));
  await mouse.setPosition(target);
  await mouse.click(Button.LEFT);
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

const nextFrameNeedle = await loadNeedle('./needles/next-frame.png');

const level14 = await loadNeedle('./needles/level_14.png');
const level11Needle = await loadNeedle('./needles/level_11.png');
const singleTileNeedle = await loadNeedle('./needles/tile.png');
// const openTowerMenuNeedle = await loadNeedle('./needles/open_tower_menu.png');
// const basic1 = await loadNeedle('./needles/buy_basic_first.png');
// const basic2 = await loadNeedle('./needles/buy_basic_second.png');
// const unpause = await loadNeedle('./needles/unpause.png');

interface FindRes {
  x: number;
  y: number;
  w: number;
  h: number;
}

const find = async (n: (typeof needles)[number]): Promise<FindRes | undefined> => {
  const screenBuf = await screenshot({ format: 'png' });
  const { mat: screenMat, canvas: screenCanvas, ctx: screenCtx } = await matFromBuffer(screenBuf);
  const grayScreen = new cv.Mat();
  cv.cvtColor(screenMat, grayScreen, cv.COLOR_RGBA2GRAY);
  cv.cvtColor(screenMat, grayScreen, cv.COLOR_RGBA2GRAY);
  cv.matchTemplate(grayScreen, n.gray, result, cv.TM_CCOEFF_NORMED);
  const { maxLoc, maxVal } = cv.minMaxLoc(result, emptyMask);

  screenMat.delete();
  grayScreen.delete();
  screenCanvas.width = screenCanvas.width; // clear

  if (maxVal < MATCH_THRESHOLD) {
    return;
  }

  return {
    x: Number(maxLoc.x),
    y: Number(maxLoc.y),
    w: Number(n.w),
    h: Number(n.h),
  };
};

const findAndClick = async (n: (typeof needles)[number]) => {
  const found = await find(n);
  if (!found) {
    return;
  }

  const cx = Math.round((found.x + n.w / 2) * scaleFactor);
  const cy = Math.round((found.y + n.h / 2) * scaleFactor);
  await clickAt(cx, cy);
};

/* global vars */

let map: FindRes;
let nextFrameButton: FindRes;
let singleTile: FindRes;

const clickFound = async (found: FindRes): Promise<void> => {
  await clickAt((found.x + found.w / 2) * scaleFactor, (found.y + found.h / 2) * scaleFactor);
};

const clickMapTile = async (x: number, y: number): Promise<void> => {
  const clickX = map.x + singleTile.w * (x + 0.5);
  const clickY = map.y + singleTile.h * (y + 0.5);
  await clickAt(clickX * scaleFactor, clickY * scaleFactor);
};

(async () => {
  const nextFrameHopefully = await find(nextFrameNeedle);
  assert(nextFrameHopefully);
  nextFrameButton = nextFrameHopefully;

  const mapHopefully = await find(level11Needle);
  assert(mapHopefully);
  map = mapHopefully;

  const singleTileHopefully = await find(singleTileNeedle);
  assert(singleTileHopefully);
  singleTile = singleTileHopefully;

  await clickMapTile(0, 0);
  await sleep(2000);
  await clickMapTile(1, 1);
  await sleep(2000);
  await clickMapTile(2, 2);
  await sleep(2000);
  await clickMapTile(3, 3);
  await sleep(2000);
  await clickMapTile(4, 4);
  await sleep(2000);
  await clickMapTile(5, 5);
  await sleep(2000);
  await clickMapTile(6, 6);
  //   await clickMapTile(9, 5);
  //   await sleep(2000);
  //   await clickMapTile(8, 4);

  if (Math.random() >= 0) {
    return;
  }

  const ts0 = performance.now();
  for (let i = 0; i < 10000; i++) {
    await clickFound(nextFrameButton);
  }
  const tookMs = performance.now() - ts0;

  console.log(`tookMs=${tookMs}`);

  if (Math.random() >= 0) {
    return;
  }

  const mapRes = await find(level14);
  const singleTileRes = await find(singleTileNeedle);
  console.log({ mapRes });

  assert(mapRes && singleTileRes);

  const clickTile = async (x: number, y: number) => {
    const clickX = mapRes.x + singleTileRes.w * (x + 0.5);
    const clickY = mapRes.y + singleTileRes.h * (y + 0.5);
    await clickAt(clickX * scaleFactor, clickY * scaleFactor);
    await clickAt(clickX * scaleFactor, clickY * scaleFactor);
    await clickAt(clickX * scaleFactor, clickY * scaleFactor);
  };

  //   console.log({ mapRes, singleTileRes });

  //   for (;;) {
  //     await findAndClick(nextFrameNeedle);
  //     console.log('click');
  //   }

  await clickTile(0, 0);

  //   await findAndClick(openTowerMenuNeedle);
  //   await findAndClick(basic1);
  //   await findAndClick(basic2);
  //   await findAndClick(unpause);
})();

// async function processScreen() {
//   try {
//     // take screenshot
//     const screenBuf = await screenshot({ format: 'png' });
//     const { mat: screenMat, canvas: screenCanvas, ctx: screenCtx } = await matFromBuffer(screenBuf);
//     const grayScreen = new cv.Mat();
//     cv.cvtColor(screenMat, grayScreen, cv.COLOR_RGBA2GRAY);

//     // get the width of a single tile

//     // screenCtx.lineWidth = 4;
//     // screenCtx.strokeStyle = 'red';

//     for (const n of needles) {
//       cv.matchTemplate(grayScreen, n.gray, result, cv.TM_CCOEFF_NORMED);
//       const { maxLoc, maxVal } = cv.minMaxLoc(result, emptyMask);

//       if (maxVal >= MATCH_THRESHOLD) {
//         console.log({ maxLoc, maxVal });

//         const squaresWidth = maxLoc.x / n.w;
//         const squaresHeight = maxLoc.y / n.h;

//         console.log({ squaresWidth, squaresHeight });

//         // screenCtx.strokeRect(maxLoc.x, maxLoc.y, n.w, n.h);

//         const cx = Math.round((maxLoc.x + n.w / 2) * scaleFactor);
//         const cy = Math.round((maxLoc.y + n.h / 2) * scaleFactor);

//         for (let i = 0; i < clicksPerNeedle; i++) clickAt(cx, cy);

//         console.log(`[FOUND] ${n.path} score=${maxVal.toFixed(3)} clicked at (${cx},${cy})`);
//       } else {
//         console.log({ n, maxVal });
//       }
//     }

//     // fs.writeFileSync('match.png', screenCanvas.toBuffer('image/png'));

//     screenMat.delete();
//     grayScreen.delete();
//     screenCanvas.width = screenCanvas.width; // clear
//   } catch (e) {
//     console.error('Error in processScreen:', e);
//   }
// }

// void processScreen();
