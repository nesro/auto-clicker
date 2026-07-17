export type GameMode = 'default' | 'pvp';

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
  activeSkillTexts: readonly string[];
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

export interface SkillDefinition {
  applyEffects: (context: SkillEvaluationContext, runState: SkillRunState) => void;
  defensivePickWeight?: SkillWeightValue;
  offensivePickWeight?: SkillWeightValue;
  pickScore: (context: SkillEvaluationContext) => number;
  pickWeight: SkillWeightValue;
  rerollScore: (context: SkillEvaluationContext) => number;
  rerollWeight: SkillWeightValue;
  shouldRerollIfPossible: (context: SkillEvaluationContext) => boolean;
  skillNumber: number;
  tags: readonly string[];
  text: string;
  weight: (context: SkillEvaluationContext) => number;
}

const LEGACY_REROLL_WEIGHT = 100;
const DEFAULT_REROLL_AGGRESSION = 0.5;
const DEFAULT_OFFENSE_DEFENSE_BALANCE = 0.5;

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

export class BaseSkill implements SkillDefinition {
  readonly defensivePickWeight?: SkillWeightValue;
  readonly offensivePickWeight?: SkillWeightValue;
  readonly pickWeight: SkillWeightValue = 0;
  readonly rerollWeight: SkillWeightValue = LEGACY_REROLL_WEIGHT;
  readonly skillNumber: number;
  readonly tags: readonly string[] = ['unconfigured'];
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
    return this.weightValue(this.rerollWeight, context);
  }

  shouldRerollIfPossible(context: SkillEvaluationContext): boolean {
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

export function activeSkillTexts(strategy: SkillStrategy, runState: SkillRunState): string[] {
  return activeSkillDefinitions(strategy, runState).map((skill) => skill.text);
}

export function createSkillStrategy(skills: readonly SkillDefinition[]): SkillStrategy {
  return {
    skills: new Map(skills.map((skill) => [skill.skillNumber, skill])),
    defaultSkill: defaultSkillDefinition,
  };
}
