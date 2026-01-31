// progress-decode.ts
//
// Decompresses a "raw DEFLATE" .sav (no zlib header) like your progress.sav,
// then prints a preview and tries to extract any embedded JSON objects.
//
// Usage:
//   npm i -D tsx
//   npx tsx progress-decode.ts ./progress.sav
//
// Or compile:
//   npm i -D typescript
//   npx tsc progress-decode.ts --target ES2020 --module commonjs
//   node progress-decode.js ./progress.sav

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { inflateRawSync } from 'node:zlib';

type JsonHit = {
  index: number;
  length: number;
  text: string;
};

function usageAndExit(code = 1): never {
  const msg = `
Usage: node progress-decode.js <path/to/progress.sav> [--out <path>] [--preview <n>] [--extract-json]

Options:
  --out <path>        Write decompressed bytes to this file (default: <input>.inflated.bin)
  --preview <n>       Print first N chars of latin1 preview (default: 1200)
  --extract-json      Attempt to find and print embedded JSON objects
`;
  // eslint-disable-next-line no-console
  console.error(msg.trim());
  process.exit(code);
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  if (args.length === 0) usageAndExit(1);

  const input = args[0];
  let outPath: string | null = './test.txt';
  let preview = 500000;
  let extractJson = true;

  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === '--out') {
      const v = args[++i];
      if (!v) usageAndExit(1);
      outPath = v;
    } else if (a === '--preview') {
      const v = args[++i];
      if (!v) usageAndExit(1);
      const n = Number(v);
      if (!Number.isFinite(n) || n < 0) throw new Error(`Invalid --preview: ${v}`);
      preview = n;
    } else if (a === '--extract-json') {
      extractJson = true;
    } else {
      throw new Error(`Unknown arg: ${a}`);
    }
  }

  return { input, outPath, preview, extractJson };
}

/**
 * Finds JSON objects/arrays embedded in arbitrary text by scanning for `{` or `[`
 * and then trying to parse the shortest balanced candidate.
 *
 * This is heuristic (works well when JSON is embedded as plain text).
 */
function findEmbeddedJson(text: string, maxHits = 20): JsonHit[] {
  const hits: JsonHit[] = [];
  const starts: number[] = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{' || ch === '[') starts.push(i);
  }

  // Try each start, grow until we find a valid parse (bounded).
  const MAX_CANDIDATE_LEN = 2_000_000; // safety
  for (const start of starts) {
    if (hits.length >= maxHits) break;

    const open = text[start];
    const close = open === '{' ? '}' : ']';
    let depth = 0;
    let inStr = false;
    let esc = false;

    // scan forward to find a balanced end position
    for (let end = start; end < text.length && end - start < MAX_CANDIDATE_LEN; end++) {
      const c = text[end];

      if (inStr) {
        if (esc) {
          esc = false;
        } else if (c === '\\') {
          esc = true;
        } else if (c === '"') {
          inStr = false;
        }
        continue;
      } else {
        if (c === '"') {
          inStr = true;
          continue;
        }
        if (c === open) depth++;
        if (c === close) depth--;

        if (depth === 0) {
          const candidate = text.slice(start, end + 1);

          // quick sanity check to avoid huge work on random braces
          if (candidate.length < 2) break;

          try {
            JSON.parse(candidate);
            hits.push({ index: start, length: candidate.length, text: candidate });
          } catch {
            // not valid JSON; keep scanning in case this is nested with junk inside
          }
          break; // for this start, stop at first balanced end
        }
      }
    }
  }

  // Deduplicate overlapping hits by index
  const byIndex = new Map<number, JsonHit>();
  for (const h of hits) {
    if (!byIndex.has(h.index)) byIndex.set(h.index, h);
  }
  return [...byIndex.values()].sort((a, b) => a.index - b.index);
}

function main() {
  const { input, outPath, preview, extractJson } = parseArgs(process.argv);

  if (!input) {
    throw new Error('no input');
  }

  const inPath = resolve(input);
  if (!existsSync(inPath)) throw new Error(`Input not found: ${inPath}`);

  const compressed = readFileSync(inPath);

  let inflated: Buffer;
  try {
    inflated = inflateRawSync(compressed);
  } catch (e: any) {
    // Helpful fallback message if it was actually zlib/gzip.
    const msg =
      `Failed to inflateRawSync (raw DEFLATE). ` +
      `If this file has a zlib header, try inflateSync instead.\n` +
      `Original error: ${e?.message ?? String(e)}`;
    throw new Error(msg);
  }

  // Default output file
  const defaultOut = join(dirname(inPath), `${basename(inPath)}.inflated.bin`);
  const out = resolve(outPath ?? defaultOut);

  writeFileSync(out, inflated);

  // Print a latin1 preview so arbitrary bytes don’t explode the console.
  const previewText = inflated.toString('latin1', 0, Math.min(inflated.length, preview));
  // eslint-disable-next-line no-console
  console.log(`Input:  ${inPath}`);
  // eslint-disable-next-line no-console
  console.log(`Output: ${out}`);
  // eslint-disable-next-line no-console
  console.log(`Compressed bytes:   ${compressed.length}`);
  // eslint-disable-next-line no-console
  console.log(`Decompressed bytes: ${inflated.length}`);
  // eslint-disable-next-line no-console
  console.log(`\n--- Preview (latin1, first ${preview} chars max) ---\n${previewText}\n`);

  if (extractJson) {
    // Attempt JSON extraction from a *texty* view. latin1 preserves 1:1 bytes->chars.
    const text = inflated.toString('latin1');
    const hits = findEmbeddedJson(text);

    if (hits.length === 0) {
      // eslint-disable-next-line no-console
      console.log('No embedded JSON objects found (heuristic scan).');
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`Found ${hits.length} JSON hit(s):`);
    for (const [i, h] of hits.entries()) {
      // eslint-disable-next-line no-console
      console.log(`\n[${i + 1}] @ index ${h.index}, length ${h.length}`);
      // Pretty print if possible, otherwise raw
      try {
        const obj = JSON.parse(h.text);
        // eslint-disable-next-line no-console
        console.log(JSON.stringify(obj, null, 2));
      } catch {
        // eslint-disable-next-line no-console
        console.log(h.text);
      }
    }
  }
}

main();
