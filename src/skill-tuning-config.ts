import { createSkillTuning, type SkillTuning } from './skill-strategy.js';

export interface SkillTuningPhase {
  minActiveSkills: number;
  tuning: Partial<SkillTuning>;
}

// 0 = defensive, 0.5 = balanced behavior, 1 = offensive.
export const SKILL_OFFENSE_BALANCE = 0.5;
// 0 = conservative rerolls, 0.5 = balanced behavior, 1 = aggressive rerolls.
export const SKILL_REROLL_AGGRESSION = 0.5;
export const SKILL_REROLL_THRESHOLD: number | undefined = undefined;

export const SKILL_TUNING_PHASES: readonly SkillTuningPhase[] = [
  {
    minActiveSkills: 0,
    tuning: {
      offenseDefenseBalance: SKILL_OFFENSE_BALANCE,
      rerollAggression: SKILL_REROLL_AGGRESSION,
      ...(SKILL_REROLL_THRESHOLD === undefined ? {} : { rerollThreshold: SKILL_REROLL_THRESHOLD }),
    },
  },
];

export function skillTuningForActiveSkillCount(activeSkillCount: number): SkillTuning {
  const [phase] = [...SKILL_TUNING_PHASES]
    .filter((item) => item.minActiveSkills <= activeSkillCount)
    .sort((a, b) => b.minActiveSkills - a.minActiveSkills);

  return createSkillTuning(phase?.tuning);
}
