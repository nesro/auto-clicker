import { BaseSkill, createSkillStrategy, type SkillBehaviorSet } from '../src/skill-strategy.js';

// Skill: add potion
export class Skill001 extends BaseSkill {
  constructor() {
    super(1);
  }

  override readonly text = 'add potion';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100164,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100164,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit after dodge
export class Skill002 extends BaseSkill {
  constructor() {
    super(2);
  }

  override readonly text = 'crit after dodge';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000087,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000087,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: max dmg +6
export class Skill003 extends BaseSkill {
  constructor() {
    super(3);
  }

  override readonly text = 'max dmg +6';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000058,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000058,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: first ranged dodged
export class Skill004 extends BaseSkill {
  constructor() {
    super(4);
  }

  override readonly text = 'first ranged dodged';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000057,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000057,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit 55% after crit
export class Skill005 extends BaseSkill {
  constructor() {
    super(5);
  }

  override readonly text = 'crit 55% after crit';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000056,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000056,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: hit next after halting
export class Skill006 extends BaseSkill {
  constructor() {
    super(6);
  }

  override readonly text = 'hit next after halting';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100156,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100156,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 15% hit all others
export class Skill007 extends BaseSkill {
  constructor() {
    super(7);
  }

  override readonly text = '15% hit all others';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100155,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100155,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +30% attack speed
export class Skill008 extends BaseSkill {
  constructor() {
    super(8);
  }

  override readonly text = '+30% attack speed';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000082,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000082,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 4 attack without missing thorn dmg
export class Skill009 extends BaseSkill {
  constructor() {
    super(9);
  }

  override readonly text = '4 attack without missing thorn dmg';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100154,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100154,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +40% first attack crit chance
export class Skill010 extends BaseSkill {
  constructor() {
    super(10);
  }

  override readonly text = '+40% first attack crit chance';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000086,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000086,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +75% dmg next attack per ranged hit
export class Skill011 extends BaseSkill {
  constructor() {
    super(11);
  }

  override readonly text = '+75% dmg next attack per ranged hit';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100153,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100153,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: healing and rage fountain doubled
export class Skill012 extends BaseSkill {
  constructor() {
    super(12);
  }

  override readonly text = 'healing and rage fountain doubled';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100128,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100128,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: min dmg +6
export class Skill013 extends BaseSkill {
  constructor() {
    super(13);
  }

  override readonly text = 'min dmg +6';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000033,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000033,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: aid arrows
export class Skill014 extends BaseSkill {
  constructor() {
    super(14);
  }

  override readonly text = 'aid arrows';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100127,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100127,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: random common skill at camps
export class Skill015 extends BaseSkill {
  constructor() {
    super(15);
  }

  override readonly text = 'random common skill at camps';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100126,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100126,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: increase dmg every hit on enemy
export class Skill016 extends BaseSkill {
  constructor() {
    super(16);
  }

  override readonly text = 'increase dmg every hit on enemy';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000032,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000032,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit +17.5%
export class Skill017 extends BaseSkill {
  constructor() {
    super(17);
  }

  override readonly text = 'crit +17.5%';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000090,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000090,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: melee dodge +17.5%
export class Skill018 extends BaseSkill {
  constructor() {
    super(18);
  }

  override readonly text = 'melee dodge +17.5%';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000089,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000089,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit dmg +1.5%
export class Skill019 extends BaseSkill {
  constructor() {
    super(19);
  }

  override readonly text = 'crit dmg +1.5%';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000039,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000039,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 35% crit hits random
export class Skill020 extends BaseSkill {
  constructor() {
    super(20);
  }

  override readonly text = '35% crit hits random';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000038,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000038,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit has 20% chance to explode
export class Skill021 extends BaseSkill {
  constructor() {
    super(21);
  }

  override readonly text = 'crit has 20% chance to explode';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000037,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000037,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit repairs 13 armor
export class Skill022 extends BaseSkill {
  constructor() {
    super(22);
  }

  override readonly text = 'crit repairs 13 armor';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000035,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000035,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit has 25% change to execute
export class Skill023 extends BaseSkill {
  constructor() {
    super(23);
  }

  override readonly text = 'crit has 25% change to execute';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000036,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000036,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit 20% change inc max hp
export class Skill024 extends BaseSkill {
  constructor() {
    super(24);
  }

  override readonly text = 'crit 20% change inc max hp';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100157,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100157,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill025 extends BaseSkill {
  constructor() {
    super(25);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Critical Kills Always Give Rage Bonus
export class Skill026 extends BaseSkill {
  constructor() {
    super(26);
  }

  override readonly text = 'Critical Kills Always Give Rage Bonus';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100149,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100149,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Critical Kills Drains HP from Random
export class Skill027 extends BaseSkill {
  constructor() {
    super(27);
  }

  override readonly text = 'Critical Kills Drains HP from Random';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100148,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100148,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Every 10th Attack Hits All In Sight
export class Skill028 extends BaseSkill {
  constructor() {
    super(28);
  }

  override readonly text = 'Every 10th Attack Hits All In Sight';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100144,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100144,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Critical Kills Increase Max HP by 18
export class Skill029 extends BaseSkill {
  constructor() {
    super(29);
  }

  override readonly text = 'Critical Kills Increase Max HP by 18';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100147,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100147,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Damage to Enemies Behind Doubles
export class Skill030 extends BaseSkill {
  constructor() {
    super(30);
  }

  override readonly text = 'Damage to Enemies Behind Doubles';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100143,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100143,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Deal 55 Damage to All Nearby Enemies Now
export class Skill031 extends BaseSkill {
  constructor() {
    super(31);
  }

  override readonly text = 'Deal 55 Damage to All Nearby Enemies Now';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100051,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100051,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Deal 11 Damage to Melee Enemies On Sight
export class Skill032 extends BaseSkill {
  constructor() {
    super(32);
  }

  override readonly text = 'Deal 11 Damage to Melee Enemies On Sight';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100050,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100050,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Deflect Every 4th Attack
export class Skill033 extends BaseSkill {
  constructor() {
    super(33);
  }

  override readonly text = 'Deflect Every 4th Attack';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000054,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000054,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodge has 20% Change to Explode Enemy
export class Skill034 extends BaseSkill {
  constructor() {
    super(34);
  }

  override readonly text = 'Dodge has 20% Change to Explode Enemy';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000052,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000052,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodging Drains 7hp
export class Skill035 extends BaseSkill {
  constructor() {
    super(35);
  }

  override readonly text = 'Dodging Drains 7hp';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100160,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100160,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +25% Dodge for Next Attack After Dodging
export class Skill036 extends BaseSkill {
  constructor() {
    super(36);
  }

  override readonly text = '+25% Dodge for Next Attack After Dodging';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000051,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000051,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodge Next 12 Attacks
export class Skill037 extends BaseSkill {
  constructor() {
    super(37);
  }

  override readonly text = 'Dodge Next 12 Attacks';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100049,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100049,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodging Ranged Attacks Returns Them
export class Skill038 extends BaseSkill {
  constructor() {
    super(38);
  }

  override readonly text = 'Dodging Ranged Attacks Returns Them';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100125,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100125,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodging Twice in a Row Heals 20 HP
export class Skill039 extends BaseSkill {
  constructor() {
    super(39);
  }

  override readonly text = 'Dodging Twice in a Row Heals 20 HP';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000030,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000030,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Failing to Dodge 8 Arrow in a Row Fully Heals
export class Skill040 extends BaseSkill {
  constructor() {
    super(40);
  }

  override readonly text = 'Failing to Dodge 8 Arrow in a Row Fully Heals';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100045,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100045,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodging Melee Hits Enemy Behind
export class Skill041 extends BaseSkill {
  constructor() {
    super(41);
  }

  override readonly text = 'Dodging Melee Hits Enemy Behind';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000050,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000050,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodging Does 6 Damage to All Enemies Behind
export class Skill042 extends BaseSkill {
  constructor() {
    super(42);
  }

  override readonly text = 'Dodging Does 6 Damage to All Enemies Behind';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100159,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100159,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Overhealing Deals Damage
export class Skill043 extends BaseSkill {
  constructor() {
    super(43);
  }

  override readonly text = 'Overhealing Deals Damage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100132,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100132,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodging Ranged Repairs 16 Armor
export class Skill044 extends BaseSkill {
  constructor() {
    super(44);
  }

  override readonly text = 'Dodging Ranged Repairs 16 Armor';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000053,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000053,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Drain 80 HP from Nearby Enemy Now
export class Skill045 extends BaseSkill {
  constructor() {
    super(45);
  }

  override readonly text = 'Drain 80 HP from Nearby Enemy Now';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100041,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100041,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Damage to Enemy In Back Drains 7 HP from Random
export class Skill046 extends BaseSkill {
  constructor() {
    super(46);
  }

  override readonly text = 'Damage to Enemy In Back Drains 7 HP from Random';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100124,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100124,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Potions Make Nearby Enemies Take +250% Damage
export class Skill047 extends BaseSkill {
  constructor() {
    super(47);
  }

  override readonly text = 'Potions Make Nearby Enemies Take +250% Damage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100135,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100135,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Potions Deflect Damage for 9.5 Seconds
export class Skill048 extends BaseSkill {
  constructor() {
    super(48);
  }

  override readonly text = 'Potions Deflect Damage for 9.5 Seconds';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000112,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000112,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Potions Will Mark Enemy to Explode
export class Skill049 extends BaseSkill {
  constructor() {
    super(49);
  }

  override readonly text = 'Potions Will Mark Enemy to Explode';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100133,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100133,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Enemies have 20% Chance to be Executed On Sight
export class Skill050 extends BaseSkill {
  constructor() {
    super(50);
  }

  override readonly text = 'Enemies have 20% Chance to be Executed On Sight';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100130,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100130,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Attack has 30% Change to Hit Next Enemy
export class Skill051 extends BaseSkill {
  constructor() {
    super(51);
  }

  override readonly text = 'Attack has 30% Change to Hit Next Enemy';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000031,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000031,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Each Kill Stuns One Archer for 5.5 Seconds
export class Skill052 extends BaseSkill {
  constructor() {
    super(52);
  }

  override readonly text = 'Each Kill Stuns One Archer for 5.5 Seconds';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000034,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000034,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Enemies 3rd Melee Attack Heals and Repairs Armor
export class Skill053 extends BaseSkill {
  constructor() {
    super(53);
  }

  override readonly text = 'Enemies 3rd Melee Attack Heals and Repairs Armor';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000055,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000055,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Enemies Never Damage HP and Armor Simultaneously
export class Skill054 extends BaseSkill {
  constructor() {
    super(54);
  }

  override readonly text = 'Enemies Never Damage HP and Armor Simultaneously';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100131,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100131,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: When Dying, Enemy Attacks Ally in Front of it For 4x Damage
export class Skill055 extends BaseSkill {
  constructor() {
    super(55);
  }

  override readonly text = 'When Dying, Enemy Attacks Ally in Front of it For 4x Damage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100034,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100034,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Critical Chance +3.5% per Hit Taken, Resets on Critical Hit
export class Skill056 extends BaseSkill {
  constructor() {
    super(56);
  }

  override readonly text = 'Critical Chance +3.5% per Hit Taken, Resets on Critical Hit';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000088,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000088,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Every 3rd Critical Hit Does +350% Damage
export class Skill057 extends BaseSkill {
  constructor() {
    super(57);
  }

  override readonly text = 'Every 3rd Critical Hit Does +350% Damage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100150,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100150,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Every Fifth Attack Hits Next Enemy, Dealing 200% Damage
export class Skill058 extends BaseSkill {
  constructor() {
    super(58);
  }

  override readonly text = 'Every Fifth Attack Hits Next Enemy, Dealing 200% Damage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100129,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100129,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: If First Enemy After Halting is an Archer, Execute it
export class Skill059 extends BaseSkill {
  constructor() {
    super(59);
  }

  override readonly text = 'If First Enemy After Halting is an Archer, Execute it';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100052,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100052,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Explode One Random Nearby Enemy Now
export class Skill060 extends BaseSkill {
  constructor() {
    super(60);
  }

  override readonly text = 'Explode One Random Nearby Enemy Now';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100047,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100047,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Receiving an Angel of Death Doubles it
export class Skill061 extends BaseSkill {
  constructor() {
    super(61);
  }

  override readonly text = 'Receiving an Angel of Death Doubles it';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100039,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100039,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Potions Increase Damage by +375% for 3 Attacks
export class Skill062 extends BaseSkill {
  constructor() {
    super(62);
  }

  override readonly text = 'Potions Increase Damage by +375% for 3 Attacks';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100134,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100134,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Heal 25 HP for Killing Enemy Unstruck
export class Skill063 extends BaseSkill {
  constructor() {
    super(63);
  }

  override readonly text = 'Heal 25 HP for Killing Enemy Unstruck';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100053,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100053,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Heal 6 HP for Each Arrow Fired
export class Skill064 extends BaseSkill {
  constructor() {
    super(64);
  }

  override readonly text = 'Heal 6 HP for Each Arrow Fired';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100181,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100181,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Fire 8 Air Arrows (2-29 Dmg) Now
export class Skill065 extends BaseSkill {
  constructor() {
    super(65);
  }

  override readonly text = 'Fire 8 Air Arrows (2-29 Dmg) Now';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100054,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100054,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: First Attack After Halting Heals
export class Skill066 extends BaseSkill {
  constructor() {
    super(66);
  }

  override readonly text = 'First Attack After Halting Heals';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100178,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100178,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: First Attack After Repairs Armor
export class Skill067 extends BaseSkill {
  constructor() {
    super(67);
  }

  override readonly text = 'First Attack After Repairs Armor';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100177,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100177,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Automatically Drink Potions at 0 HP
export class Skill068 extends BaseSkill {
  constructor() {
    super(68);
  }

  override readonly text = 'Automatically Drink Potions at 0 HP';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100030,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100030,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Fountains also Give Gold
export class Skill069 extends BaseSkill {
  constructor() {
    super(69);
  }

  override readonly text = 'Fountains also Give Gold';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100031,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100031,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Heal Fountains Increases Max HP
export class Skill070 extends BaseSkill {
  constructor() {
    super(70);
  }

  override readonly text = 'Heal Fountains Increases Max HP';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100040,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100040,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Fountains also Repair Armor
export class Skill071 extends BaseSkill {
  constructor() {
    super(71);
  }

  override readonly text = 'Fountains also Repair Armor';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100044,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100044,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Full Armor Sets Dodge to 85%
export class Skill072 extends BaseSkill {
  constructor() {
    super(72);
  }

  override readonly text = 'Full Armor Sets Dodge to 85%';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100056,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100056,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Getting Fully Healed Repairs 30 Armor
export class Skill073 extends BaseSkill {
  constructor() {
    super(73);
  }

  override readonly text = 'Getting Fully Healed Repairs 30 Armor';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100055,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100055,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +300 Damage every 5th Attack
export class Skill074 extends BaseSkill {
  constructor() {
    super(74);
  }

  override readonly text = '+300 Damage every 5th Attack';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100123,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100123,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Repairing Armor Deals Damage
export class Skill075 extends BaseSkill {
  constructor() {
    super(75);
  }

  override readonly text = 'Repairing Armor Deals Damage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100145,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100145,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Get 1 Random Rare Skill Now
export class Skill076 extends BaseSkill {
  constructor() {
    super(76);
  }

  override readonly text = 'Get 1 Random Rare Skill Now';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100176,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100176,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Heal 23 HP Every Time Enemy Drops Gold
export class Skill077 extends BaseSkill {
  constructor() {
    super(77);
  }

  override readonly text = 'Heal 23 HP Every Time Enemy Drops Gold';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100163,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100163,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Deal 33 Damage Every Time an Enemy Drops Gold
export class Skill078 extends BaseSkill {
  constructor() {
    super(78);
  }

  override readonly text = 'Deal 33 Damage Every Time an Enemy Drops Gold';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100162,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100162,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Having Armor Increases Dodge by 15%
export class Skill079 extends BaseSkill {
  constructor() {
    super(79);
  }

  override readonly text = 'Having Armor Increases Dodge by 15%';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100175,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100175,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 0 Armor Increases Melee Dodge by 15%
export class Skill080 extends BaseSkill {
  constructor() {
    super(80);
  }

  override readonly text = '0 Armor Increases Melee Dodge by 15%';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100174,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100174,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Surviving with 11HP and 0 Armor Repairs All Armor
export class Skill081 extends BaseSkill {
  constructor() {
    super(81);
  }

  override readonly text = 'Surviving with 11HP and 0 Armor Repairs All Armor';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100033,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100033,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Healing on Level Up +30 HP
export class Skill082 extends BaseSkill {
  constructor() {
    super(82);
  }

  override readonly text = 'Healing on Level Up +30 HP';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100032,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100032,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Healing Fountains also Give Rage
export class Skill083 extends BaseSkill {
  constructor() {
    super(83);
  }

  override readonly text = 'Healing Fountains also Give Rage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100057,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100057,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Fully Heal Once After Killing 10 Enemies
export class Skill084 extends BaseSkill {
  constructor() {
    super(84);
  }

  override readonly text = 'Fully Heal Once After Killing 10 Enemies';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100048,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100048,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Heal 20 HP when Armor Depletes
export class Skill085 extends BaseSkill {
  constructor() {
    super(85);
  }

  override readonly text = 'Heal 20 HP when Armor Depletes';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100043,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100043,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Also Heal Equivalent to Armor at Camps
export class Skill086 extends BaseSkill {
  constructor() {
    super(86);
  }

  override readonly text = 'Also Heal Equivalent to Armor at Camps';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100042,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100042,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 35% Change for Ranged Attacks to Heal
export class Skill087 extends BaseSkill {
  constructor() {
    super(87);
  }

  override readonly text = '35% Change for Ranged Attacks to Heal';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100180,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100180,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Healing Deals 13 Thorn Damage
export class Skill088 extends BaseSkill {
  constructor() {
    super(88);
  }

  override readonly text = 'Healing Deals 13 Thorn Damage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100179,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100179,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Heal Fully Now
export class Skill089 extends BaseSkill {
  constructor() {
    super(89);
  }

  override readonly text = 'Heal Fully Now';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100058,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100058,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Heal 22HP Every 4 Seconds Spent Running
export class Skill090 extends BaseSkill {
  constructor() {
    super(90);
  }

  override readonly text = 'Heal 22HP Every 4 Seconds Spent Running';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100161,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100161,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Dodge is 80% if HP less than 34
export class Skill091 extends BaseSkill {
  constructor() {
    super(91);
  }

  override readonly text = 'Dodge is 80% if HP less than 34';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000091,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000091,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Every Attack Deals 6 Damage to Enemy in Back
export class Skill092 extends BaseSkill {
  constructor() {
    super(92);
  }

  override readonly text = 'Every Attack Deals 6 Damage to Enemy in Back';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100173,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100173,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Archers Behind, when Damaged, will shoot Ally (5.5x Dmg); Archers Behind, when Damaged, will shoot All Allies (3x Dmg)
export class Skill093 extends BaseSkill {
  constructor() {
    super(93);
  }

  override readonly text =
    'Archers Behind, when Damaged, will shoot Ally (5.5x Dmg); Archers Behind, when Damaged, will shoot All Allies (3x Dmg)';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100060,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100060,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill094 extends BaseSkill {
  constructor() {
    super(94);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 70% Change for Lethal Attacks to Hit Random Enemy Instead
export class Skill095 extends BaseSkill {
  constructor() {
    super(95);
  }

  override readonly text = '70% Change for Lethal Attacks to Hit Random Enemy Instead';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100029,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100029,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +55% Critical Chance on Archers
export class Skill096 extends BaseSkill {
  constructor() {
    super(96);
  }

  override readonly text = '+55% Critical Chance on Archers';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000085,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000085,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Chance for Enemy to Drop Gold +110%
export class Skill097 extends BaseSkill {
  constructor() {
    super(97);
  }

  override readonly text = 'Chance for Enemy to Drop Gold +110%';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100038,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100038,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Getting Common SKills Increases Max Armor by 24
export class Skill098 extends BaseSkill {
  constructor() {
    super(98);
  }

  override readonly text = 'Getting Common SKills Increases Max Armor by 24';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100037,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100037,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +19 Max HP at Level Up
export class Skill099 extends BaseSkill {
  constructor() {
    super(99);
  }

  override readonly text = '+19 Max HP at Level Up';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100036,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100036,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Execute 1 Random Enemy at Level Up
export class Skill100 extends BaseSkill {
  constructor() {
    super(100);
  }

  override readonly text = 'Execute 1 Random Enemy at Level Up';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100035,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100035,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Every 8th Critical Hit Executes the Enemy
export class Skill101 extends BaseSkill {
  constructor() {
    super(101);
  }

  override readonly text = 'Every 8th Critical Hit Executes the Enemy';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000084,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000084,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Instant Level Up at Camp
export class Skill102 extends BaseSkill {
  constructor() {
    super(102);
  }

  override readonly text = 'Instant Level Up at Camp';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100146,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100146,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Killing Enemy Behind Heals 25HP
export class Skill103 extends BaseSkill {
  constructor() {
    super(103);
  }

  override readonly text = 'Killing Enemy Behind Heals 25HP';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100152,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100152,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Killing deals 17 Thorn Damage to Random
export class Skill104 extends BaseSkill {
  constructor() {
    super(104);
  }

  override readonly text = 'Killing deals 17 Thorn Damage to Random';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100151,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100151,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Killing an Enemy Behind Fires 3 Air Arrows 2-24Dmg
export class Skill105 extends BaseSkill {
  constructor() {
    super(105);
  }

  override readonly text = 'Killing an Enemy Behind Fires 3 Air Arrows 2-24Dmg';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100046,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100046,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Every Kill increases Ranged Dodge by 1%
export class Skill106 extends BaseSkill {
  constructor() {
    super(106);
  }

  override readonly text = 'Every Kill increases Ranged Dodge by 1%';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000049,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000049,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill107 extends BaseSkill {
  constructor() {
    super(107);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100028,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100028,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill108 extends BaseSkill {
  constructor() {
    super(108);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100027,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100027,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill109 extends BaseSkill {
  constructor() {
    super(109);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100026,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100026,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill110 extends BaseSkill {
  constructor() {
    super(110);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100025,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100025,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill111 extends BaseSkill {
  constructor() {
    super(111);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100024,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100024,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill112 extends BaseSkill {
  constructor() {
    super(112);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000029,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000029,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill113 extends BaseSkill {
  constructor() {
    super(113);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100023,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100023,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill114 extends BaseSkill {
  constructor() {
    super(114);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100022,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100022,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill115 extends BaseSkill {
  constructor() {
    super(115);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100021,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100021,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill116 extends BaseSkill {
  constructor() {
    super(116);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100020,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100020,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill117 extends BaseSkill {
  constructor() {
    super(117);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100019,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100019,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill118 extends BaseSkill {
  constructor() {
    super(118);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100018,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100018,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill119 extends BaseSkill {
  constructor() {
    super(119);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100017,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100017,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill120 extends BaseSkill {
  constructor() {
    super(120);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100016,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100016,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill121 extends BaseSkill {
  constructor() {
    super(121);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100015,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100015,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill122 extends BaseSkill {
  constructor() {
    super(122);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100104,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100104,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill123 extends BaseSkill {
  constructor() {
    super(123);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100103,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100103,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill124 extends BaseSkill {
  constructor() {
    super(124);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100102,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100102,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill125 extends BaseSkill {
  constructor() {
    super(125);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100101,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100101,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill126 extends BaseSkill {
  constructor() {
    super(126);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100100,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100100,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill127 extends BaseSkill {
  constructor() {
    super(127);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100014,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100014,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill128 extends BaseSkill {
  constructor() {
    super(128);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100013,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100013,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Ranged Dodge +17.5%
export class Skill129 extends BaseSkill {
  constructor() {
    super(129);
  }

  override readonly text = 'Ranged Dodge +17.5%';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000081,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000081,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: dodging ranged stabs
export class Skill130 extends BaseSkill {
  constructor() {
    super(130);
  }

  override readonly text = 'dodging ranged stabs';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000048,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000048,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill131 extends BaseSkill {
  constructor() {
    super(131);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100099,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100099,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill132 extends BaseSkill {
  constructor() {
    super(132);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100098,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100098,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill133 extends BaseSkill {
  constructor() {
    super(133);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100097,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100097,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill134 extends BaseSkill {
  constructor() {
    super(134);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100012,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100012,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill135 extends BaseSkill {
  constructor() {
    super(135);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100096,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100096,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill136 extends BaseSkill {
  constructor() {
    super(136);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100095,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100095,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill137 extends BaseSkill {
  constructor() {
    super(137);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100094,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100094,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill138 extends BaseSkill {
  constructor() {
    super(138);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100093,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100093,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill139 extends BaseSkill {
  constructor() {
    super(139);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100092,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100092,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill140 extends BaseSkill {
  constructor() {
    super(140);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100091,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100091,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill141 extends BaseSkill {
  constructor() {
    super(141);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100090,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100090,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill142 extends BaseSkill {
  constructor() {
    super(142);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100089,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100089,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill143 extends BaseSkill {
  constructor() {
    super(143);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100106,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100106,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill144 extends BaseSkill {
  constructor() {
    super(144);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100105,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100105,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: reroll
export class Skill145 extends BaseSkill {
  constructor() {
    super(145);
  }

  override readonly text = 'reroll';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000001,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000001,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill146 extends BaseSkill {
  constructor() {
    super(146);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100108,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100108,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill147 extends BaseSkill {
  constructor() {
    super(147);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100107,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100107,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill148 extends BaseSkill {
  constructor() {
    super(148);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100088,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100088,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill149 extends BaseSkill {
  constructor() {
    super(149);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100087,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100087,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill150 extends BaseSkill {
  constructor() {
    super(150);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100086,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100086,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill151 extends BaseSkill {
  constructor() {
    super(151);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100085,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100085,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill152 extends BaseSkill {
  constructor() {
    super(152);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100084,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100084,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill153 extends BaseSkill {
  constructor() {
    super(153);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100083,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100083,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill154 extends BaseSkill {
  constructor() {
    super(154);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100082,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100082,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill155 extends BaseSkill {
  constructor() {
    super(155);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100081,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100081,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: xx Damage Behind Stuns
export class Skill156 extends BaseSkill {
  constructor() {
    super(156);
  }

  override readonly text = 'xx Damage Behind Stuns';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100172,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100172,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Potions Stuns Nearby Enemies for 10.5 Seconds
export class Skill157 extends BaseSkill {
  constructor() {
    super(157);
  }

  override readonly text = 'Potions Stuns Nearby Enemies for 10.5 Seconds';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000111,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000111,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill158 extends BaseSkill {
  constructor() {
    super(158);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100080,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100080,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill159 extends BaseSkill {
  constructor() {
    super(159);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100079,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100079,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill160 extends BaseSkill {
  constructor() {
    super(160);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100078,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100078,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill161 extends BaseSkill {
  constructor() {
    super(161);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100077,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100077,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill162 extends BaseSkill {
  constructor() {
    super(162);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100076,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100076,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: first attack after halt 3.5x dmg
export class Skill163 extends BaseSkill {
  constructor() {
    super(163);
  }

  override readonly text = 'first attack after halt 3.5x dmg';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100182,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100182,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill164 extends BaseSkill {
  constructor() {
    super(164);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: halting inc dodge and crit
export class Skill165 extends BaseSkill {
  constructor() {
    super(165);
  }

  override readonly text = 'halting inc dodge and crit';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000096,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000096,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill166 extends BaseSkill {
  constructor() {
    super(166);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000026,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000026,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill167 extends BaseSkill {
  constructor() {
    super(167);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100109,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100109,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill168 extends BaseSkill {
  constructor() {
    super(168);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100110,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100110,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill169 extends BaseSkill {
  constructor() {
    super(169);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100111,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100111,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill170 extends BaseSkill {
  constructor() {
    super(170);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100112,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100112,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill171 extends BaseSkill {
  constructor() {
    super(171);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000025,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000025,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill172 extends BaseSkill {
  constructor() {
    super(172);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000024,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000024,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill173 extends BaseSkill {
  constructor() {
    super(173);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000023,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000023,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill174 extends BaseSkill {
  constructor() {
    super(174);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000022,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000022,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill175 extends BaseSkill {
  constructor() {
    super(175);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000047,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000047,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 2 crits heals
export class Skill176 extends BaseSkill {
  constructor() {
    super(176);
  }

  override readonly text = '2 crits heals';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000110,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000110,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill177 extends BaseSkill {
  constructor() {
    super(177);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100171,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100171,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill178 extends BaseSkill {
  constructor() {
    super(178);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100170,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100170,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill179 extends BaseSkill {
  constructor() {
    super(179);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100011,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100011,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: deflect after kill
export class Skill180 extends BaseSkill {
  constructor() {
    super(180);
  }

  override readonly text = 'deflect after kill';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000080,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000080,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: deflect after level
export class Skill181 extends BaseSkill {
  constructor() {
    super(181);
  }

  override readonly text = 'deflect after level';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000079,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000079,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: dodge +17.5%
export class Skill182 extends BaseSkill {
  constructor() {
    super(182);
  }

  override readonly text = 'dodge +17.5%';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000095,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000095,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill183 extends BaseSkill {
  constructor() {
    super(183);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000046,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000046,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill184 extends BaseSkill {
  constructor() {
    super(184);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100113,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100113,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: double dodge ranged
export class Skill185 extends BaseSkill {
  constructor() {
    super(185);
  }

  override readonly text = 'double dodge ranged';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000094,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000094,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill186 extends BaseSkill {
  constructor() {
    super(186);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100114,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100114,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill187 extends BaseSkill {
  constructor() {
    super(187);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100169,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100169,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill188 extends BaseSkill {
  constructor() {
    super(188);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100010,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100010,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill189 extends BaseSkill {
  constructor() {
    super(189);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100009,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100009,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill190 extends BaseSkill {
  constructor() {
    super(190);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100075,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100075,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Crit stuns
export class Skill191 extends BaseSkill {
  constructor() {
    super(191);
  }

  override readonly text = 'Crit stuns';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000114,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000114,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: Crit refils
export class Skill192 extends BaseSkill {
  constructor() {
    super(192);
  }

  override readonly text = 'Crit refils';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000113,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000113,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill193 extends BaseSkill {
  constructor() {
    super(193);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100074,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100074,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill194 extends BaseSkill {
  constructor() {
    super(194);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100073,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100073,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill195 extends BaseSkill {
  constructor() {
    super(195);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100168,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100168,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: dodge stuns
export class Skill196 extends BaseSkill {
  constructor() {
    super(196);
  }

  override readonly text = 'dodge stuns';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000109,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000109,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill197 extends BaseSkill {
  constructor() {
    super(197);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100142,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100142,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill198 extends BaseSkill {
  constructor() {
    super(198);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100072,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100072,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill199 extends BaseSkill {
  constructor() {
    super(199);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100141,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100141,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill200 extends BaseSkill {
  constructor() {
    super(200);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100140,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100140,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill201 extends BaseSkill {
  constructor() {
    super(201);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100139,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100139,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill202 extends BaseSkill {
  constructor() {
    super(202);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000078,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000078,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill203 extends BaseSkill {
  constructor() {
    super(203);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100007,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100007,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill204 extends BaseSkill {
  constructor() {
    super(204);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100006,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100006,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill205 extends BaseSkill {
  constructor() {
    super(205);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100005,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100005,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill206 extends BaseSkill {
  constructor() {
    super(206);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100071,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100071,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill207 extends BaseSkill {
  constructor() {
    super(207);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100070,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100070,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill208 extends BaseSkill {
  constructor() {
    super(208);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100167,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100167,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 0 armor inc crit %
export class Skill209 extends BaseSkill {
  constructor() {
    super(209);
  }

  override readonly text = '0 armor inc crit %';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000108,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000108,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill210 extends BaseSkill {
  constructor() {
    super(210);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100166,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100166,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit heals
export class Skill211 extends BaseSkill {
  constructor() {
    super(211);
  }

  override readonly text = 'crit heals';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000107,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000107,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill212 extends BaseSkill {
  constructor() {
    super(212);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100115,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100115,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill213 extends BaseSkill {
  constructor() {
    super(213);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000045,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000045,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill214 extends BaseSkill {
  constructor() {
    super(214);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100004,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100004,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill215 extends BaseSkill {
  constructor() {
    super(215);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000077,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000077,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill216 extends BaseSkill {
  constructor() {
    super(216);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100158,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100158,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill217 extends BaseSkill {
  constructor() {
    super(217);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100069,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100069,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill218 extends BaseSkill {
  constructor() {
    super(218);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100068,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100068,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill219 extends BaseSkill {
  constructor() {
    super(219);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100067,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100067,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill220 extends BaseSkill {
  constructor() {
    super(220);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100116,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100116,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill221 extends BaseSkill {
  constructor() {
    super(221);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100117,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100117,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill222 extends BaseSkill {
  constructor() {
    super(222);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100118,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100118,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill223 extends BaseSkill {
  constructor() {
    super(223);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100119,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100119,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill224 extends BaseSkill {
  constructor() {
    super(224);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100165,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100165,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill225 extends BaseSkill {
  constructor() {
    super(225);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000044,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000044,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill226 extends BaseSkill {
  constructor() {
    super(226);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000043,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000043,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill227 extends BaseSkill {
  constructor() {
    super(227);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000042,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000042,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: dodge refils
export class Skill228 extends BaseSkill {
  constructor() {
    super(228);
  }

  override readonly text = 'dodge refils';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000106,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000106,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill229 extends BaseSkill {
  constructor() {
    super(229);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100121,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100121,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill230 extends BaseSkill {
  constructor() {
    super(230);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100120,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100120,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill231 extends BaseSkill {
  constructor() {
    super(231);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000021,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000021,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill232 extends BaseSkill {
  constructor() {
    super(232);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100066,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100066,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill233 extends BaseSkill {
  constructor() {
    super(233);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100065,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100065,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill234 extends BaseSkill {
  constructor() {
    super(234);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100064,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100064,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill235 extends BaseSkill {
  constructor() {
    super(235);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000020,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000020,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill236 extends BaseSkill {
  constructor() {
    super(236);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000019,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000019,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill237 extends BaseSkill {
  constructor() {
    super(237);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100063,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100063,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill238 extends BaseSkill {
  constructor() {
    super(238);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000018,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000018,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill239 extends BaseSkill {
  constructor() {
    super(239);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100138,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100138,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill240 extends BaseSkill {
  constructor() {
    super(240);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100062,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100062,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: triple rage
export class Skill241 extends BaseSkill {
  constructor() {
    super(241);
  }

  override readonly text = 'triple rage';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100183,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100183,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill242 extends BaseSkill {
  constructor() {
    super(242);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100008,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100008,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill243 extends BaseSkill {
  constructor() {
    super(243);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100061,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100061,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill244 extends BaseSkill {
  constructor() {
    super(244);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000017,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000017,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill245 extends BaseSkill {
  constructor() {
    super(245);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000016,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000016,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill246 extends BaseSkill {
  constructor() {
    super(246);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000015,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000015,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill247 extends BaseSkill {
  constructor() {
    super(247);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000014,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000014,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill248 extends BaseSkill {
  constructor() {
    super(248);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000013,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000013,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill249 extends BaseSkill {
  constructor() {
    super(249);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000012,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000012,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill250 extends BaseSkill {
  constructor() {
    super(250);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000011,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000011,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: block archers in combat; crit hits all
export class Skill251 extends BaseSkill {
  constructor() {
    super(251);
  }

  override readonly text = 'block archers in combat; crit hits all';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000105,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000105,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill252 extends BaseSkill {
  constructor() {
    super(252);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 0,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill253 extends BaseSkill {
  constructor() {
    super(253);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000028,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000028,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill254 extends BaseSkill {
  constructor() {
    super(254);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000027,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000027,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: crit stuns all,
export class Skill255 extends BaseSkill {
  constructor() {
    super(255);
  }

  override readonly text = 'crit stuns all,';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000115,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000115,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill256 extends BaseSkill {
  constructor() {
    super(256);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000076,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000076,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill257 extends BaseSkill {
  constructor() {
    super(257);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000010,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000010,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill258 extends BaseSkill {
  constructor() {
    super(258);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000009,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000009,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill259 extends BaseSkill {
  constructor() {
    super(259);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000008,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000008,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill260 extends BaseSkill {
  constructor() {
    super(260);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000007,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000007,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill261 extends BaseSkill {
  constructor() {
    super(261);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100122,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100122,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill262 extends BaseSkill {
  constructor() {
    super(262);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000075,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000075,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill263 extends BaseSkill {
  constructor() {
    super(263);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000074,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000074,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill264 extends BaseSkill {
  constructor() {
    super(264);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000073,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000073,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill265 extends BaseSkill {
  constructor() {
    super(265);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000072,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000072,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill266 extends BaseSkill {
  constructor() {
    super(266);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000071,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000071,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill267 extends BaseSkill {
  constructor() {
    super(267);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000097,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000097,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill268 extends BaseSkill {
  constructor() {
    super(268);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000006,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000006,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill269 extends BaseSkill {
  constructor() {
    super(269);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000005,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000005,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill270 extends BaseSkill {
  constructor() {
    super(270);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100003,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100003,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill271 extends BaseSkill {
  constructor() {
    super(271);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000004,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000004,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill272 extends BaseSkill {
  constructor() {
    super(272);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000003,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000003,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill273 extends BaseSkill {
  constructor() {
    super(273);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000002,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000002,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill274 extends BaseSkill {
  constructor() {
    super(274);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000070,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000070,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill275 extends BaseSkill {
  constructor() {
    super(275);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000069,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000069,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill276 extends BaseSkill {
  constructor() {
    super(276);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000068,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000068,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill277 extends BaseSkill {
  constructor() {
    super(277);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000067,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000067,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 60% chance keep potion
export class Skill278 extends BaseSkill {
  constructor() {
    super(278);
  }

  override readonly text = '60% chance keep potion';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000101,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000101,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill279 extends BaseSkill {
  constructor() {
    super(279);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100137,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100137,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill280 extends BaseSkill {
  constructor() {
    super(280);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100136,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100136,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: 20 % refill on kill
export class Skill281 extends BaseSkill {
  constructor() {
    super(281);
  }

  override readonly text = '20 % refill on kill';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000100,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000100,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill282 extends BaseSkill {
  constructor() {
    super(282);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000066,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000066,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill283 extends BaseSkill {
  constructor() {
    super(283);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000065,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000065,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill284 extends BaseSkill {
  constructor() {
    super(284);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100002,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100002,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill285 extends BaseSkill {
  constructor() {
    super(285);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000093,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000093,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill286 extends BaseSkill {
  constructor() {
    super(286);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000041,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000041,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill287 extends BaseSkill {
  constructor() {
    super(287);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000040,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000040,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: min dmg = max dmg
export class Skill288 extends BaseSkill {
  constructor() {
    super(288);
  }

  override readonly text = 'min dmg = max dmg';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000083,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000083,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: no more common skills
export class Skill289 extends BaseSkill {
  constructor() {
    super(289);
  }

  override readonly text = 'no more common skills';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000103,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000103,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: dodge twice heals
export class Skill290 extends BaseSkill {
  constructor() {
    super(290);
  }

  override readonly text = 'dodge twice heals';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000102,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000102,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: +1 max dmg per skill
export class Skill291 extends BaseSkill {
  constructor() {
    super(291);
  }

  override readonly text = '+1 max dmg per skill';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000099,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000099,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill292 extends BaseSkill {
  constructor() {
    super(292);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000098,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000098,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill293 extends BaseSkill {
  constructor() {
    super(293);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000064,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000064,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill294 extends BaseSkill {
  constructor() {
    super(294);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'rerollIfPossible'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 100001,
      shouldRerollIfPossible: true,
    },
    ruins: {
      weight: 100001,
      shouldRerollIfPossible: true,
    },
  } as const satisfies SkillBehaviorSet;
}

// Skill: healing repairs armor
export class Skill295 extends BaseSkill {
  constructor() {
    super(295);
  }

  override readonly text = 'healing repairs armor';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000092,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000092,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill296 extends BaseSkill {
  constructor() {
    super(296);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000063,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000063,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill297 extends BaseSkill {
  constructor() {
    super(297);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000062,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000062,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill298 extends BaseSkill {
  constructor() {
    super(298);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000061,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000061,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill299 extends BaseSkill {
  constructor() {
    super(299);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000060,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000060,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

// TODO: Add skill description.
export class Skill300 extends BaseSkill {
  constructor() {
    super(300);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['legacy', 'alwaysPick'] as const;

  protected override readonly behaviors = {
    default: {
      weight: 1000059,
      shouldRerollIfPossible: false,
    },
    ruins: {
      weight: 1000059,
      shouldRerollIfPossible: false,
    },
  } as const satisfies SkillBehaviorSet;
}

export const skills = [
  new Skill001(),
  new Skill002(),
  new Skill003(),
  new Skill004(),
  new Skill005(),
  new Skill006(),
  new Skill007(),
  new Skill008(),
  new Skill009(),
  new Skill010(),
  new Skill011(),
  new Skill012(),
  new Skill013(),
  new Skill014(),
  new Skill015(),
  new Skill016(),
  new Skill017(),
  new Skill018(),
  new Skill019(),
  new Skill020(),
  new Skill021(),
  new Skill022(),
  new Skill023(),
  new Skill024(),
  new Skill025(),
  new Skill026(),
  new Skill027(),
  new Skill028(),
  new Skill029(),
  new Skill030(),
  new Skill031(),
  new Skill032(),
  new Skill033(),
  new Skill034(),
  new Skill035(),
  new Skill036(),
  new Skill037(),
  new Skill038(),
  new Skill039(),
  new Skill040(),
  new Skill041(),
  new Skill042(),
  new Skill043(),
  new Skill044(),
  new Skill045(),
  new Skill046(),
  new Skill047(),
  new Skill048(),
  new Skill049(),
  new Skill050(),
  new Skill051(),
  new Skill052(),
  new Skill053(),
  new Skill054(),
  new Skill055(),
  new Skill056(),
  new Skill057(),
  new Skill058(),
  new Skill059(),
  new Skill060(),
  new Skill061(),
  new Skill062(),
  new Skill063(),
  new Skill064(),
  new Skill065(),
  new Skill066(),
  new Skill067(),
  new Skill068(),
  new Skill069(),
  new Skill070(),
  new Skill071(),
  new Skill072(),
  new Skill073(),
  new Skill074(),
  new Skill075(),
  new Skill076(),
  new Skill077(),
  new Skill078(),
  new Skill079(),
  new Skill080(),
  new Skill081(),
  new Skill082(),
  new Skill083(),
  new Skill084(),
  new Skill085(),
  new Skill086(),
  new Skill087(),
  new Skill088(),
  new Skill089(),
  new Skill090(),
  new Skill091(),
  new Skill092(),
  new Skill093(),
  new Skill094(),
  new Skill095(),
  new Skill096(),
  new Skill097(),
  new Skill098(),
  new Skill099(),
  new Skill100(),
  new Skill101(),
  new Skill102(),
  new Skill103(),
  new Skill104(),
  new Skill105(),
  new Skill106(),
  new Skill107(),
  new Skill108(),
  new Skill109(),
  new Skill110(),
  new Skill111(),
  new Skill112(),
  new Skill113(),
  new Skill114(),
  new Skill115(),
  new Skill116(),
  new Skill117(),
  new Skill118(),
  new Skill119(),
  new Skill120(),
  new Skill121(),
  new Skill122(),
  new Skill123(),
  new Skill124(),
  new Skill125(),
  new Skill126(),
  new Skill127(),
  new Skill128(),
  new Skill129(),
  new Skill130(),
  new Skill131(),
  new Skill132(),
  new Skill133(),
  new Skill134(),
  new Skill135(),
  new Skill136(),
  new Skill137(),
  new Skill138(),
  new Skill139(),
  new Skill140(),
  new Skill141(),
  new Skill142(),
  new Skill143(),
  new Skill144(),
  new Skill145(),
  new Skill146(),
  new Skill147(),
  new Skill148(),
  new Skill149(),
  new Skill150(),
  new Skill151(),
  new Skill152(),
  new Skill153(),
  new Skill154(),
  new Skill155(),
  new Skill156(),
  new Skill157(),
  new Skill158(),
  new Skill159(),
  new Skill160(),
  new Skill161(),
  new Skill162(),
  new Skill163(),
  new Skill164(),
  new Skill165(),
  new Skill166(),
  new Skill167(),
  new Skill168(),
  new Skill169(),
  new Skill170(),
  new Skill171(),
  new Skill172(),
  new Skill173(),
  new Skill174(),
  new Skill175(),
  new Skill176(),
  new Skill177(),
  new Skill178(),
  new Skill179(),
  new Skill180(),
  new Skill181(),
  new Skill182(),
  new Skill183(),
  new Skill184(),
  new Skill185(),
  new Skill186(),
  new Skill187(),
  new Skill188(),
  new Skill189(),
  new Skill190(),
  new Skill191(),
  new Skill192(),
  new Skill193(),
  new Skill194(),
  new Skill195(),
  new Skill196(),
  new Skill197(),
  new Skill198(),
  new Skill199(),
  new Skill200(),
  new Skill201(),
  new Skill202(),
  new Skill203(),
  new Skill204(),
  new Skill205(),
  new Skill206(),
  new Skill207(),
  new Skill208(),
  new Skill209(),
  new Skill210(),
  new Skill211(),
  new Skill212(),
  new Skill213(),
  new Skill214(),
  new Skill215(),
  new Skill216(),
  new Skill217(),
  new Skill218(),
  new Skill219(),
  new Skill220(),
  new Skill221(),
  new Skill222(),
  new Skill223(),
  new Skill224(),
  new Skill225(),
  new Skill226(),
  new Skill227(),
  new Skill228(),
  new Skill229(),
  new Skill230(),
  new Skill231(),
  new Skill232(),
  new Skill233(),
  new Skill234(),
  new Skill235(),
  new Skill236(),
  new Skill237(),
  new Skill238(),
  new Skill239(),
  new Skill240(),
  new Skill241(),
  new Skill242(),
  new Skill243(),
  new Skill244(),
  new Skill245(),
  new Skill246(),
  new Skill247(),
  new Skill248(),
  new Skill249(),
  new Skill250(),
  new Skill251(),
  new Skill252(),
  new Skill253(),
  new Skill254(),
  new Skill255(),
  new Skill256(),
  new Skill257(),
  new Skill258(),
  new Skill259(),
  new Skill260(),
  new Skill261(),
  new Skill262(),
  new Skill263(),
  new Skill264(),
  new Skill265(),
  new Skill266(),
  new Skill267(),
  new Skill268(),
  new Skill269(),
  new Skill270(),
  new Skill271(),
  new Skill272(),
  new Skill273(),
  new Skill274(),
  new Skill275(),
  new Skill276(),
  new Skill277(),
  new Skill278(),
  new Skill279(),
  new Skill280(),
  new Skill281(),
  new Skill282(),
  new Skill283(),
  new Skill284(),
  new Skill285(),
  new Skill286(),
  new Skill287(),
  new Skill288(),
  new Skill289(),
  new Skill290(),
  new Skill291(),
  new Skill292(),
  new Skill293(),
  new Skill294(),
  new Skill295(),
  new Skill296(),
  new Skill297(),
  new Skill298(),
  new Skill299(),
  new Skill300(),
] as const;

export const skillStrategy = createSkillStrategy(skills);
