/*

npx tsx ./src/main.ts

*/

import { functionLoadNeedles } from './needle.js';

async function main(): Promise<void> {
  try {
    await functionLoadNeedles();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

void main();
