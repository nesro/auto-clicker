/*
npx tsx ./src/main.ts
*/

import { setTimeout } from 'node:timers/promises';

import { NEEDLE_NAME_BY_KEY } from './generated/needle-names.js';
import { NEEDLE_GROUPS } from './needle-groups.js';
import { readNumberInFound, readTextInFound } from './ocr.js';
import {
  captureScreen,
  clickFound,
  findAllInScreen,
  loadNeedlesByNameFromDir,
  type Rect,
} from './needle.js';

const NEEDLE_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles_dung';

const SCREENSHOT_INTERVAL_MS = 1000;
const SCREEN_REGION: Rect = { x: 552, y: 210, w: 2400, h: 1092 };

const READ_TEXT = false;
const ACTIVE_NEEDLES = NEEDLE_GROUPS.all;

async function main(): Promise<void> {
  try {
    const needlesByName = await loadNeedlesByNameFromDir(NEEDLE_DIR, NEEDLE_NAME_BY_KEY);
    const needles = ACTIVE_NEEDLES.map((name) => needlesByName[name]);
    for (const needle of needles) {
      if (needle.matchThreshold !== undefined) {
        console.log(`loaded: ${needle.path}, threshold: ${needle.matchThreshold}`);
      }
    }

    // TODO debug code to check if finding skill number works
    if (Math.random()) {
      const screen = await captureScreen(SCREEN_REGION);
      const founds = findAllInScreen(screen, needlesByName.skillNumberCommon);
      for (const found of founds) {
        const number = readNumberInFound(screen, found);
        console.log({ number });
      }
    }

    for (;;) {
      const startedAt = Date.now();
      const screen = await captureScreen(SCREEN_REGION);

      try {
        for (const needle of needles) {
          const foundMatches = findAllInScreen(screen, needle);
          for (const found of foundMatches) {
            if (READ_TEXT) {
              const text = await readTextInFound(screen, found);
              console.log(
                `found: ${needle.path}, score: ${found.score?.toFixed(3)}, ocr: ${text || '(empty)'}`,
              );
            }
            console.log(`found: ${needle.path}, score: ${found.score?.toFixed(3)}`);
            await clickFound(found);
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
