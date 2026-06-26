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
}

export type SkillBehaviorValue<T> = T | ((context: SkillEvaluationContext) => T);

export interface SkillBehavior {
  applyEffects?: (context: SkillEvaluationContext, runState: SkillRunState) => void;
  shouldRerollIfPossible: SkillBehaviorValue<boolean>;
  weight: SkillBehaviorValue<number>;
}

export type SkillBehaviorVariant = 'default' | 'ruins';

export type SkillBehaviorSet = { default: SkillBehavior } & Partial<
  Record<Exclude<SkillBehaviorVariant, 'default'>, SkillBehavior>
>;

export interface SkillDefinition {
  applyEffects: (context: SkillEvaluationContext, runState: SkillRunState) => void;
  shouldRerollIfPossible: (context: SkillEvaluationContext) => boolean;
  skillNumber: number;
  tags: readonly string[];
  text: string;
  weight: (context: SkillEvaluationContext) => number;
}

export class BaseSkill implements SkillDefinition {
  protected readonly behaviors: SkillBehaviorSet = {
    default: {
      shouldRerollIfPossible: true,
      weight: 0,
    },
  };

  readonly skillNumber: number;
  readonly tags: readonly string[] = ['unconfigured'];
  readonly text: string = 'TODO: Add skill description.';

  constructor(skillNumber: number) {
    this.skillNumber = skillNumber;
  }

  protected behaviorVariant(context: SkillEvaluationContext): SkillBehaviorVariant {
    switch (true) {
      case context.flags.ruins:
        return 'ruins';
      default:
        return 'default';
    }
  }

  protected behavior(context: SkillEvaluationContext): SkillBehavior {
    return this.behaviors[this.behaviorVariant(context)] ?? this.behaviors.default;
  }

  protected behaviorValue<T>(value: SkillBehaviorValue<T>, context: SkillEvaluationContext): T {
    return typeof value === 'function'
      ? (value as (context: SkillEvaluationContext) => T)(context)
      : value;
  }

  weight(context: SkillEvaluationContext): number {
    return this.behaviorValue(this.behavior(context).weight, context);
  }

  shouldRerollIfPossible(context: SkillEvaluationContext): boolean {
    return this.behaviorValue(this.behavior(context).shouldRerollIfPossible, context);
  }

  applyEffects(context: SkillEvaluationContext, _runState: SkillRunState): void {
    this.behavior(context).applyEffects?.(context, _runState);
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

export function setActionNeedleEnabled(
  runState: SkillRunState,
  needleKey: string,
  enabled: boolean,
): void {
  runState.actionNeedleOverrides.set(needleKey, enabled);
}

export function gameModeValue<T>(
  context: SkillEvaluationContext,
  values: Partial<Record<GameMode, T>> & { default: T },
): T {
  return values[context.gameMode] ?? values.default;
}

export function defaultSkillDefinition(skillNumber: number): SkillDefinition {
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

export function activeSkillDefinitions(
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
