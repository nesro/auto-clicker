/*
npx tsx ./src/main.ts
*/

import { setTimeout } from 'node:timers/promises';
import fs from 'node:fs/promises';

import { findAndClick, functionLoadNeedles, loadNeedle, Needle } from './needle.js';

async function main(): Promise<void> {
  try {
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
      for (const needle of needles) {
        await findAndClick(needle);
      }
      await setTimeout(500);
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

void main();
