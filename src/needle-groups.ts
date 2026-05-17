import { NEEDLE_KEYS, type NeedleKey } from './generated/needle-names.js';

export const NEEDLE_GROUPS = {
  all: NEEDLE_KEYS,
  rarity: [],
  skillNumbers: ['skillNumberRare'],
  navigation: ['continue', 'descendArrow', 'startDescent', 'toDepth'],
  rewards: ['campGold'],
} as const satisfies Record<string, readonly NeedleKey[]>;

export type NeedleGroupName = keyof typeof NEEDLE_GROUPS;
