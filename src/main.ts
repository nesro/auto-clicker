/*
npx tsx ./src/main.ts
*/

import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';

import { captureScreen, findAndClickInScreen, loadNeedle, Needle } from './needle.js';

const SCREENSHOT_INTERVAL_MS = 1000;

async function main(): Promise<void> {
  try {
    await captureScreen({ x: 552, y: 210, w: 2400, h: 1092 });
    if (Math.random()) {
      process.exit(0);
    }

    const needles: Needle[] = [];
    const files = await fs.readdir(
      '/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles/',
    );
    for (const file of files) {
      const needle = await loadNeedle(
        `/Users/tomasnesrovnal/g/nesro/auto-clicker/obsidian-knight/needles/${file}`,
      );
      needles.push(needle);
    }

    for (;;) {
      const startedAt = Date.now();
      const screen = await captureScreen();

      try {
        for (const needle of needles) {
          await findAndClickInScreen(screen, needle);
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
