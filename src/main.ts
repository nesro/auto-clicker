/*
npx tsx ./src/main.ts
*/

import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';

import { readTextInFound } from './ocr.js';
import {
  captureScreen,
  clickFound,
  findAllInScreen,
  loadNeedle,
  Needle,
  type Rect,
} from './needle.js';

const NEEDLE_DIR = '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles_dung';

const SCREENSHOT_INTERVAL_MS = 1000;
const SCREEN_REGION: Rect = { x: 552, y: 210, w: 2400, h: 1092 };

const READ_TEXT = false;

async function main(): Promise<void> {
  try {
    const needles: Needle[] = [];
    const files = await fs.readdir(NEEDLE_DIR);
    for (const file of files) {
      const needle = await loadNeedle(`${NEEDLE_DIR}/${file}`);
      needles.push(needle);
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
