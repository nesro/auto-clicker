import fs from 'node:fs/promises';

export type SkillCatalogRarity = 'common' | 'rare' | 'epic';

export interface SkillTextCatalogEntry {
  index: number;
  normalizedText: string;
  rarity: SkillCatalogRarity;
  text: string;
  tokens: readonly string[];
}

export interface SkillTextCatalogMatch {
  entry: SkillTextCatalogEntry;
  margin: number;
  runnerUpScore: number;
  score: number;
}

export interface SkillTextCatalogMatchOptions {
  rarity?: SkillCatalogRarity;
}

const VALID_RARITIES = new Set<SkillCatalogRarity>(['common', 'rare', 'epic']);
const DEFAULT_MIN_MATCH_MARGIN = 0.04;
const DEFAULT_MIN_MATCH_SCORE = 0.62;

const TOKEN_NORMALIZATIONS = new Map<string, string>([
  ['air', 'aid'],
  ['arow', 'arrow'],
  ['arrows', 'arrow'],
  ['change', 'chance'],
  ['changes', 'chance'],
  ['crit', 'critical'],
  ['crits', 'critical'],
  ['dmg', 'damage'],
  ['dmgx', 'damage'],
  ['drains', 'drain'],
  ['enemies', 'enemy'],
  ['fires', 'fire'],
  ['fountains', 'fountain'],
  ['heals', 'heal'],
  ['hits', 'hit'],
  ['inc', 'increase'],
  ['increases', 'increase'],
  ['kills', 'kill'],
  ['misses', 'miss'],
  ['potions', 'potion'],
  ['ranged', 'range'],
  ['refils', 'refill'],
  ['refills', 'refill'],
  ['repairs', 'repair'],
  ['skills', 'skill'],
  ['stuns', 'stun'],
]);

function normalizeToken(token: string): string {
  return TOKEN_NORMALIZATIONS.get(token) ?? token;
}

export function normalizeSkillText(text: string): string {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/([0-9])x\b/g, '$1 x')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(normalizeToken)
    .join(' ');
}

function skillTextTokens(text: string): string[] {
  return normalizeSkillText(text).split(' ').filter(Boolean);
}

function parseRarity(value: string, source: string): SkillCatalogRarity {
  const rarity = value.trim().toLowerCase();
  if (!VALID_RARITIES.has(rarity as SkillCatalogRarity)) {
    throw new Error(`${source} has invalid rarity: ${value}`);
  }

  return rarity as SkillCatalogRarity;
}

function parseSkillTextCatalogLine(
  line: string,
  index: number,
  source: string,
): SkillTextCatalogEntry {
  const separatorIndex = line.indexOf('|');
  if (separatorIndex === -1) {
    throw new Error(`${source}:${index + 1} must use "Rarity | Skill text"`);
  }

  const rarity = parseRarity(line.slice(0, separatorIndex), `${source}:${index + 1}`);
  const text = line.slice(separatorIndex + 1).trim();
  if (text.length === 0) {
    throw new Error(`${source}:${index + 1} must include skill text`);
  }

  const normalizedText = normalizeSkillText(text);
  return {
    index,
    normalizedText,
    rarity,
    text,
    tokens: normalizedText.split(' ').filter(Boolean),
  };
}

export function parseSkillTextCatalog(
  raw: string,
  source = 'skill text catalog',
): SkillTextCatalogEntry[] {
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => parseSkillTextCatalogLine(line, index, source));
}

export async function loadSkillTextCatalog(filePath: string): Promise<SkillTextCatalogEntry[]> {
  return parseSkillTextCatalog(await fs.readFile(filePath, 'utf8'), filePath);
}

function countedTokens(tokens: readonly string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }

  return counts;
}

function tokenDice(leftTokens: readonly string[], rightTokens: readonly string[]): number {
  if (leftTokens.length === 0 || rightTokens.length === 0) {
    return 0;
  }

  const left = countedTokens(leftTokens);
  const right = countedTokens(rightTokens);
  let intersection = 0;

  for (const [token, leftCount] of left) {
    intersection += Math.min(leftCount, right.get(token) ?? 0);
  }

  return (2 * intersection) / (leftTokens.length + rightTokens.length);
}

function ngrams(text: string, size: number): Set<string> {
  const padded = ` ${text} `;
  if (padded.length <= size) {
    return new Set([padded]);
  }

  const values = new Set<string>();
  for (let index = 0; index <= padded.length - size; index += 1) {
    values.add(padded.slice(index, index + size));
  }

  return values;
}

function setDice(left: ReadonlySet<string>, right: ReadonlySet<string>): number {
  if (left.size === 0 || right.size === 0) {
    return 0;
  }

  let intersection = 0;
  for (const value of left) {
    if (right.has(value)) {
      intersection += 1;
    }
  }

  return (2 * intersection) / (left.size + right.size);
}

function charDice(left: string, right: string): number {
  return setDice(ngrams(left, 3), ngrams(right, 3));
}

function textSimilarity(ocrText: string, entry: SkillTextCatalogEntry): number {
  const normalized = normalizeSkillText(ocrText);
  if (normalized.length === 0) {
    return 0;
  }

  if (normalized === entry.normalizedText) {
    return 1;
  }

  const entryTextContainsOcr =
    entry.normalizedText.includes(normalized) &&
    normalized.length / Math.max(entry.normalizedText.length, 1) >= 0.45;
  const ocrContainsEntry =
    normalized.includes(entry.normalizedText) &&
    entry.normalizedText.length / Math.max(normalized.length, 1) >= 0.45;

  const tokenScore = tokenDice(skillTextTokens(normalized), entry.tokens);
  const charScore = charDice(normalized, entry.normalizedText);
  const baseScore = tokenScore * 0.55 + charScore * 0.45;

  return entryTextContainsOcr || ocrContainsEntry ? Math.max(baseScore, 0.9) : baseScore;
}

function rankAgainstEntries(
  ocrText: string,
  entries: readonly SkillTextCatalogEntry[],
): SkillTextCatalogMatch[] {
  const scored = entries
    .map((entry) => ({
      entry,
      score: textSimilarity(ocrText, entry),
    }))
    .sort((left, right) => right.score - left.score || left.entry.index - right.entry.index);

  return scored.map(({ entry, score }, index) => {
    const runnerUpScore = scored[index === 0 ? 1 : 0]?.score ?? 0;
    return {
      entry,
      margin: Math.max(0, score - runnerUpScore),
      runnerUpScore,
      score,
    };
  });
}

export function rankSkillTextCatalogMatches(
  ocrText: string,
  catalog: readonly SkillTextCatalogEntry[],
  options: SkillTextCatalogMatchOptions = {},
): SkillTextCatalogMatch[] {
  if (normalizeSkillText(ocrText).length === 0) {
    return [];
  }

  if (options.rarity === undefined) {
    return rankAgainstEntries(ocrText, catalog);
  }

  const rarityMatches = catalog.filter((entry) => entry.rarity === options.rarity);
  const rankedRarityMatches = rankAgainstEntries(ocrText, rarityMatches);
  const [bestRarityMatch] = rankedRarityMatches;

  if (bestRarityMatch && bestRarityMatch.score >= DEFAULT_MIN_MATCH_SCORE) {
    return rankedRarityMatches;
  }

  return rankAgainstEntries(ocrText, catalog);
}

export function bestSkillTextCatalogMatch(
  ocrText: string,
  catalog: readonly SkillTextCatalogEntry[],
  options: SkillTextCatalogMatchOptions = {},
): SkillTextCatalogMatch | undefined {
  return rankSkillTextCatalogMatches(ocrText, catalog, options)[0];
}

export function isReliableSkillTextCatalogMatch(
  match: SkillTextCatalogMatch | undefined,
  minScore = DEFAULT_MIN_MATCH_SCORE,
  minMargin = DEFAULT_MIN_MATCH_MARGIN,
): match is SkillTextCatalogMatch {
  return match !== undefined && match.score >= minScore && match.margin >= minMargin;
}
