/*

npx tsx ./src/trash/main3.ts

*/

import { Button, Point, mouse, sleep } from '@nut-tree-fork/nut-js';
import cvReady from '@techstark/opencv-js';
import screenshot from 'screenshot-desktop';
import assert from 'node:assert';
import { execFileSync } from 'node:child_process';
import { loadNeedle, type FindRes, matFromBuffer, type Needle } from '../needle';
import { readNumber } from '../ocr';

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

const needles: Needle[] = await Promise.all(NEEDLE_PATHS.map(loadNeedle));
const result = new cv.Mat();
const emptyMask = new cv.Mat();

const nextFrameNeedle = await loadNeedle('./needles/next-frame.png');

const level14 = await loadNeedle('./needles/level_14.png');
const level11Needle = await loadNeedle('./needles/level_11.png');
const singleTileNeedle = await loadNeedle('./needles/tile.png');
const coinsAreaNeedle = await loadNeedle('./needles/coins-area.png');

const find = async (n: Needle): Promise<FindRes | undefined> => {
  const screenBuf = await screenshot({ format: 'png' });
  const { mat: screenMat, canvas: screenCanvas } = await matFromBuffer(screenBuf);
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

const findAndClick = async (n: Needle) => {
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
let coinsArea: FindRes;

coinsArea = { x: 588, y: 136, w: 336, h: 104 };

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

  if (!coinsArea) {
    const coinsAreaHopefully = await find(coinsAreaNeedle);
    assert(coinsAreaHopefully);
    coinsArea = coinsAreaHopefully;
  }

  const res = await readNumber(coinsArea);
  console.log({ res });

  const ts0 = performance.now();

  let frame = 0;

  for (let i = 0; i < 50; i++) {
    for (let j = 0; j < 30; j++) {
      frame++;
      await clickFound(nextFrameButton);
    }

    const readCoins = await readNumber(coinsArea);
    console.log(`frame: ${frame}, coins: ${readCoins}`);
  }
  const tookMs = performance.now() - ts0;

  if (Math.random() >= 0) {
    return;
  }

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

  await clickTile(0, 0);
})();
