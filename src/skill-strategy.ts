export type GameMode = 'default' | 'pvp' | 'hard';
export type SkillScoringMode = 'legacy' | 'tag-tier';
export type SkillTier = 'S' | 'A' | 'B' | 'C' | 'D' | 'trash' | 'unrated';

export interface SkillStats {
  armor?: number;
  health?: number;
  maxArmor?: number;
  maxHealth?: number;
}

export interface SkillRunState {
  activeSkills: Set<number>;
  actionNeedleOverrides: Map<string, boolean>;
  flags: SkillFeatureFlags;
  gameMode: GameMode;
  startedAtMs: number;
}

export interface SkillFeatureFlags {
  ruins: boolean;
}

export interface SkillTuning {
  offenseDefenseBalance: number;
  rerollAggression: number;
  rerollThreshold: number;
}

export interface SkillEvaluationContext {
  activeSkills: ReadonlySet<number>;
  activeSkillTags: ReadonlyMap<string, number>;
  activeSkillTexts: readonly string[];
  activeSkillTiers: ReadonlyMap<SkillTier, number>;
  elapsedMs: number;
  flags: SkillFeatureFlags;
  gameMode: GameMode;
  nowMs: number;
  offeredSkillNumbers: readonly number[];
  rarity?: 'common' | 'rare' | 'epic';
  runStartedAtMs: number;
  skillNumber: number;
  stats: SkillStats;
  tuning: SkillTuning;
}

export type SkillWeightValue = number | ((context: SkillEvaluationContext) => number);

export interface SkillTagPreference {
  activeCountTag?: string;
  activeCountTarget?: number;
  score: number;
  scoreAfterTarget?: number;
}

export type SkillTagPreferenceConfig = number | SkillTagPreference;

export interface SkillModeScoringProfile {
  basePickScore: number;
  defaultTagScore: number;
  defaultTierScore: number;
  rerollPickScoreBelow: number;
  rerollWeight: number;
  tagPreferences: Readonly<Record<string, SkillTagPreferenceConfig>>;
  tagScoreMode: 'best' | 'sum';
  tagScoreMultiplier: number;
  tierScoreMultiplier: number;
  tierScores: Readonly<Record<SkillTier, number>>;
}

export interface SkillTagTierScore {
  dominantTag?: string;
  pickScore: number;
  tagScore: number;
  tierScore: number;
}

export interface SkillDefinition {
  applyEffects: (context: SkillEvaluationContext, runState: SkillRunState) => void;
  defensivePickWeight?: SkillWeightValue;
  offensivePickWeight?: SkillWeightValue;
  pickScore: (context: SkillEvaluationContext) => number;
  pickWeight: SkillWeightValue;
  rerollScore: (context: SkillEvaluationContext) => number;
  rerollWeight: SkillWeightValue;
  scoringMode: SkillScoringMode;
  shouldRerollIfPossible: (context: SkillEvaluationContext) => boolean;
  skillNumber: number;
  tags: readonly string[];
  tier: SkillTier;
  text: string;
  weight: (context: SkillEvaluationContext) => number;
}

const LEGACY_REROLL_WEIGHT = 100;
const DEFAULT_REROLL_AGGRESSION = 0.5;
const DEFAULT_OFFENSE_DEFENSE_BALANCE = 0.5;
const DEFAULT_BASE_PICK_SCORE = 1_000_000;

const DEFAULT_TIER_SCORES: Record<SkillTier, number> = {
  S: 90,
  A: 70,
  B: 50,
  C: 30,
  D: 10,
  trash: -100,
  unrated: 0,
};

export const SKILL_MODE_SCORING_PROFILES: Record<GameMode, SkillModeScoringProfile> = {
  default: {
    basePickScore: DEFAULT_BASE_PICK_SCORE,
    defaultTagScore: 0,
    defaultTierScore: 0,
    rerollPickScoreBelow: DEFAULT_BASE_PICK_SCORE + 450_000,
    rerollWeight: LEGACY_REROLL_WEIGHT,
    tagPreferences: {
      survival: 760,
      exploding: 740,
      'mass-damage': 700,
      execute: 660,
      crit: 620,
      'attack-speed': 600,
      'raw-damage': 560,
      utility: 260,
      economy: 160,
    },
    tagScoreMode: 'best',
    tagScoreMultiplier: 1_000,
    tierScoreMultiplier: 100,
    tierScores: DEFAULT_TIER_SCORES,
  },
  pvp: {
    basePickScore: DEFAULT_BASE_PICK_SCORE,
    defaultTagScore: 0,
    defaultTierScore: 0,
    rerollPickScoreBelow: DEFAULT_BASE_PICK_SCORE + 550_000,
    rerollWeight: LEGACY_REROLL_WEIGHT,
    tagPreferences: {
      exploding: 1_000,
      'mass-damage': 900,
      execute: 820,
      crit: 760,
      'attack-speed': 700,
      'raw-damage': 650,
      'single-target': 580,
      survival: 200,
      utility: 100,
      economy: 50,
    },
    tagScoreMode: 'best',
    tagScoreMultiplier: 1_000,
    tierScoreMultiplier: 100,
    tierScores: DEFAULT_TIER_SCORES,
  },
  hard: {
    basePickScore: DEFAULT_BASE_PICK_SCORE,
    defaultTagScore: 0,
    defaultTierScore: 0,
    rerollPickScoreBelow: DEFAULT_BASE_PICK_SCORE + 350_000,
    rerollWeight: LEGACY_REROLL_WEIGHT,
    tagPreferences: {
      survival: {
        activeCountTarget: 2,
        score: 1_000,
        scoreAfterTarget: 450,
      },
      armor: {
        activeCountTag: 'survival',
        activeCountTarget: 2,
        score: 950,
        scoreAfterTarget: 430,
      },
      healing: {
        activeCountTag: 'survival',
        activeCountTarget: 2,
        score: 930,
        scoreAfterTarget: 420,
      },
      dodge: {
        activeCountTag: 'survival',
        activeCountTarget: 2,
        score: 910,
        scoreAfterTarget: 410,
      },
      'max-health': {
        activeCountTag: 'survival',
        activeCountTarget: 2,
        score: 880,
        scoreAfterTarget: 400,
      },
      exploding: 720,
      'mass-damage': 700,
      execute: 660,
      crit: 600,
      'attack-speed': 560,
      'raw-damage': 520,
      utility: 180,
      economy: 80,
    },
    tagScoreMode: 'best',
    tagScoreMultiplier: 1_000,
    tierScoreMultiplier: 100,
    tierScores: DEFAULT_TIER_SCORES,
  },
};

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
}

function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

function rerollThresholdFromAggression(rerollAggression: number): number {
  return LEGACY_REROLL_WEIGHT * (1 - clamp(rerollAggression, 0, 1));
}

export function createSkillTuning(tuning: Partial<SkillTuning> = {}): SkillTuning {
  const rerollAggression = clamp(tuning.rerollAggression ?? DEFAULT_REROLL_AGGRESSION, 0, 1);

  return {
    offenseDefenseBalance: clamp(
      tuning.offenseDefenseBalance ?? DEFAULT_OFFENSE_DEFENSE_BALANCE,
      0,
      1,
    ),
    rerollAggression,
    rerollThreshold: tuning.rerollThreshold ?? rerollThresholdFromAggression(rerollAggression),
  };
}

function tagPreferenceFromConfig(config: SkillTagPreferenceConfig): SkillTagPreference {
  return typeof config === 'number' ? { score: config } : config;
}

function activeTagCount(context: SkillEvaluationContext, tag: string): number {
  return context.activeSkillTags.get(tag) ?? 0;
}

function adjustedTagPreferenceScore(
  preference: SkillTagPreference,
  tag: string,
  context: SkillEvaluationContext,
): number {
  if (preference.activeCountTarget === undefined) {
    return preference.score;
  }

  const countTag = preference.activeCountTag ?? tag;
  if (activeTagCount(context, countTag) < preference.activeCountTarget) {
    return preference.score;
  }

  return preference.scoreAfterTarget ?? preference.score;
}

export function skillModeScoringProfile(gameMode: GameMode): SkillModeScoringProfile {
  return SKILL_MODE_SCORING_PROFILES[gameMode] ?? SKILL_MODE_SCORING_PROFILES.default;
}

export function usesTagTierScoring(skill: SkillDefinition): boolean {
  return skill.scoringMode === 'tag-tier' || skill.tier !== 'unrated';
}

export function scoreSkillByTagsAndTier(
  skill: Pick<SkillDefinition, 'tags' | 'tier'>,
  context: SkillEvaluationContext,
): SkillTagTierScore {
  const profile = skillModeScoringProfile(context.gameMode);
  const tagScores = skill.tags.map((tag) => {
    const config = profile.tagPreferences[tag];
    const score =
      config === undefined
        ? profile.defaultTagScore
        : adjustedTagPreferenceScore(tagPreferenceFromConfig(config), tag, context);

    return { score, tag };
  });
  const bestTagScore = tagScores.reduce<{ score: number; tag?: string }>(
    (best, current) => (current.score > best.score ? current : best),
    { score: profile.defaultTagScore },
  );
  const tagScore =
    profile.tagScoreMode === 'sum'
      ? tagScores.reduce((sum, item) => sum + item.score, 0) || profile.defaultTagScore
      : bestTagScore.score;
  const tierScore = profile.tierScores[skill.tier] ?? profile.defaultTierScore;

  return {
    dominantTag: bestTagScore.tag,
    pickScore:
      profile.basePickScore +
      tagScore * profile.tagScoreMultiplier +
      tierScore * profile.tierScoreMultiplier,
    tagScore,
    tierScore,
  };
}

export function shouldRerollByTagsAndTier(
  skill: Pick<SkillDefinition, 'tags' | 'tier'>,
  context: SkillEvaluationContext,
): boolean {
  const profile = skillModeScoringProfile(context.gameMode);
  return (
    scoreSkillByTagsAndTier(skill, context).pickScore < profile.rerollPickScoreBelow &&
    profile.rerollWeight > context.tuning.rerollThreshold
  );
}

export function rerollScoreByTagsAndTier(
  skill: Pick<SkillDefinition, 'tags' | 'tier'>,
  context: SkillEvaluationContext,
): number {
  return shouldRerollByTagsAndTier(skill, context)
    ? skillModeScoringProfile(context.gameMode).rerollWeight
    : 0;
}

export class BaseSkill implements SkillDefinition {
  readonly defensivePickWeight?: SkillWeightValue;
  readonly offensivePickWeight?: SkillWeightValue;
  readonly pickWeight: SkillWeightValue = 0;
  readonly rerollWeight: SkillWeightValue = LEGACY_REROLL_WEIGHT;
  readonly scoringMode: SkillScoringMode = 'legacy';
  readonly skillNumber: number;
  readonly tags: readonly string[] = ['unconfigured'];
  readonly tier: SkillTier = 'unrated';
  readonly text: string = 'TODO: Add skill description.';

  constructor(skillNumber: number) {
    this.skillNumber = skillNumber;
  }

  protected weightValue(value: SkillWeightValue, context: SkillEvaluationContext): number {
    return typeof value === 'function'
      ? (value as (context: SkillEvaluationContext) => number)(context)
      : value;
  }

  protected optionalWeightValue(
    value: SkillWeightValue | undefined,
    context: SkillEvaluationContext,
  ): number | undefined {
    return value === undefined ? undefined : this.weightValue(value, context);
  }

  protected balancedPickWeight(context: SkillEvaluationContext): number {
    return this.weightValue(this.pickWeight, context);
  }

  pickScore(context: SkillEvaluationContext): number {
    if (usesTagTierScoring(this)) {
      return scoreSkillByTagsAndTier(this, context).pickScore;
    }

    const balance = clamp(context.tuning.offenseDefenseBalance, 0, 1);
    const balanced = this.balancedPickWeight(context);
    const offensive = this.optionalWeightValue(this.offensivePickWeight, context) ?? balanced;
    const defensive = this.optionalWeightValue(this.defensivePickWeight, context) ?? balanced;

    if (balance >= DEFAULT_OFFENSE_DEFENSE_BALANCE) {
      return lerp(balanced, offensive, (balance - DEFAULT_OFFENSE_DEFENSE_BALANCE) * 2);
    }

    return lerp(defensive, balanced, balance * 2);
  }

  weight(context: SkillEvaluationContext): number {
    return this.pickScore(context);
  }

  rerollScore(context: SkillEvaluationContext): number {
    if (usesTagTierScoring(this)) {
      return rerollScoreByTagsAndTier(this, context);
    }

    return this.weightValue(this.rerollWeight, context);
  }

  shouldRerollIfPossible(context: SkillEvaluationContext): boolean {
    if (usesTagTierScoring(this)) {
      return shouldRerollByTagsAndTier(this, context);
    }

    return this.rerollScore(context) > context.tuning.rerollThreshold;
  }

  applyEffects(_context: SkillEvaluationContext, _runState: SkillRunState): void {
    return;
  }
}

export interface SkillStrategy {
  defaultSkill: (skillNumber: number) => SkillDefinition;
  skills: ReadonlyMap<number, SkillDefinition>;
}

export function createSkillRunState(
  gameMode: GameMode,
  flags: SkillFeatureFlags,
  startedAtMs = Date.now(),
): SkillRunState {
  return {
    activeSkills: new Set(),
    actionNeedleOverrides: new Map(),
    flags,
    gameMode,
    startedAtMs,
  };
}

export function isActionNeedleEnabled(
  runState: SkillRunState,
  needleKey: string,
  defaultEnabled = true,
): boolean {
  return runState.actionNeedleOverrides.get(needleKey) ?? defaultEnabled;
}

function setActionNeedleEnabled(
  runState: SkillRunState,
  needleKey: string,
  enabled: boolean,
): void {
  runState.actionNeedleOverrides.set(needleKey, enabled);
}

function gameModeValue<T>(
  context: SkillEvaluationContext,
  values: Partial<Record<GameMode, T>> & { default: T },
): T {
  return values[context.gameMode] ?? values.default;
}

function defaultSkillDefinition(skillNumber: number): SkillDefinition {
  return new BaseSkill(skillNumber);
}

export function getSkillDefinition(strategy: SkillStrategy, skillNumber: number): SkillDefinition {
  return strategy.skills.get(skillNumber) ?? strategy.defaultSkill(skillNumber);
}

export function markSkillPicked(
  strategy: SkillStrategy,
  runState: SkillRunState,
  context: SkillEvaluationContext,
): void {
  runState.activeSkills.add(context.skillNumber);
  getSkillDefinition(strategy, context.skillNumber).applyEffects(context, runState);
}

function activeSkillDefinitions(
  strategy: SkillStrategy,
  runState: SkillRunState,
): SkillDefinition[] {
  return [...runState.activeSkills].map((skillNumber) => getSkillDefinition(strategy, skillNumber));
}

export function skillTagCounts(
  skills: readonly Pick<SkillDefinition, 'tags'>[],
): Map<string, number> {
  const counts = new Map<string, number>();

  for (const skill of skills) {
    for (const tag of skill.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return counts;
}

export function skillTierCounts(
  skills: readonly Pick<SkillDefinition, 'tier'>[],
): Map<SkillTier, number> {
  const counts = new Map<SkillTier, number>();

  for (const skill of skills) {
    counts.set(skill.tier, (counts.get(skill.tier) ?? 0) + 1);
  }

  return counts;
}

export function activeSkillTexts(strategy: SkillStrategy, runState: SkillRunState): string[] {
  return activeSkillDefinitions(strategy, runState).map((skill) => skill.text);
}

export function activeSkillTags(
  strategy: SkillStrategy,
  runState: SkillRunState,
): Map<string, number> {
  return skillTagCounts(activeSkillDefinitions(strategy, runState));
}

export function activeSkillTiers(
  strategy: SkillStrategy,
  runState: SkillRunState,
): Map<SkillTier, number> {
  return skillTierCounts(activeSkillDefinitions(strategy, runState));
}

export function createSkillStrategy(skills: readonly SkillDefinition[]): SkillStrategy {
  return {
    skills: new Map(skills.map((skill) => [skill.skillNumber, skill])),
    defaultSkill: defaultSkillDefinition,
  };
}
