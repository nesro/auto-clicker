import {
  BaseSkill,
  createSkillStrategy,
  type SkillEvaluationContext,
} from '../src/skill-strategy.js';

class Skill001 extends BaseSkill {
  constructor() {
    super(1);
  }

  override readonly text = 'add potion';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100164;

  override readonly rerollWeight = 100;
}

class Skill002 extends BaseSkill {
  constructor() {
    super(2);
  }

  override readonly text = 'crit after dodge';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000087;

  override readonly rerollWeight = 0;
}

class Skill003 extends BaseSkill {
  constructor() {
    super(3);
  }

  override readonly text = 'max dmg +6';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000058;

  override readonly rerollWeight = 0;
}

class Skill004 extends BaseSkill {
  constructor() {
    super(4);
  }

  override readonly text = 'first ranged dodged';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000057;

  override readonly rerollWeight = 0;
}

class Skill005 extends BaseSkill {
  constructor() {
    super(5);
  }

  override readonly text = 'crit 55% after crit';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000056;

  override readonly rerollWeight = 0;
}

class Skill006 extends BaseSkill {
  constructor() {
    super(6);
  }

  override readonly text = 'hit next after halting';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100156;

  override readonly rerollWeight = 100;
}

class Skill007 extends BaseSkill {
  constructor() {
    super(7);
  }

  override readonly text = '15% hit all others';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100155;

  override readonly rerollWeight = 100;
}

class Skill008 extends BaseSkill {
  constructor() {
    super(8);
  }

  override readonly text = '+30% attack speed';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000082;

  override readonly rerollWeight = 0;
}

class Skill009 extends BaseSkill {
  constructor() {
    super(9);
  }

  override readonly text = '4 attack without missing thorn dmg';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100154;

  override readonly rerollWeight = 100;
}

class Skill010 extends BaseSkill {
  constructor() {
    super(10);
  }

  override readonly text = '+40% first attack crit chance';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000086;

  override readonly rerollWeight = 0;
}

class Skill011 extends BaseSkill {
  constructor() {
    super(11);
  }

  override readonly text = '+75% dmg next attack per ranged hit';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100153;

  override readonly rerollWeight = 100;
}

class Skill012 extends BaseSkill {
  constructor() {
    super(12);
  }

  override readonly text = 'healing and rage fountain doubled';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100128;

  override readonly rerollWeight = 100;
}

class Skill013 extends BaseSkill {
  constructor() {
    super(13);
  }

  override readonly text = 'min dmg +6';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000033;

  override readonly rerollWeight = 0;
}

class Skill014 extends BaseSkill {
  constructor() {
    super(14);
  }

  override readonly text = 'aid arrows';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100127;

  override readonly rerollWeight = 100;
}

class Skill015 extends BaseSkill {
  constructor() {
    super(15);
  }

  override readonly text = 'random common skill at camps';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100126;

  override readonly rerollWeight = 100;
}

class Skill016 extends BaseSkill {
  constructor() {
    super(16);
  }

  override readonly text = 'increase dmg every hit on enemy';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000032;

  override readonly rerollWeight = 0;
}

class Skill017 extends BaseSkill {
  constructor() {
    super(17);
  }

  override readonly text = 'crit +17.5%';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000090;

  override readonly rerollWeight = 0;
}

class Skill018 extends BaseSkill {
  constructor() {
    super(18);
  }

  override readonly text = 'melee dodge +17.5%';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000089;

  override readonly rerollWeight = 0;
}

class Skill019 extends BaseSkill {
  constructor() {
    super(19);
  }

  override readonly text = 'crit dmg +1.5%';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000039;

  override readonly rerollWeight = 0;
}

class Skill020 extends BaseSkill {
  constructor() {
    super(20);
  }

  override readonly text = '35% crit hits random';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000038;

  override readonly rerollWeight = 0;
}

class Skill021 extends BaseSkill {
  constructor() {
    super(21);
  }

  override readonly text = 'crit has 20% chance to explode';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000037;

  override readonly rerollWeight = 0;
}

class Skill022 extends BaseSkill {
  constructor() {
    super(22);
  }

  override readonly text = 'crit repairs 13 armor';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000035;

  override readonly rerollWeight = 0;
}

class Skill023 extends BaseSkill {
  constructor() {
    super(23);
  }

  override readonly text = 'crit has 25% change to execute';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000036;

  override readonly rerollWeight = 0;
}

class Skill024 extends BaseSkill {
  constructor() {
    super(24);
  }

  override readonly text = 'crit 20% change inc max hp';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100157;

  override readonly rerollWeight = 100;
}

class Skill025 extends BaseSkill {
  constructor() {
    super(25);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  override readonly pickWeight = 0;

  override readonly rerollWeight = 100;
}

class Skill026 extends BaseSkill {
  constructor() {
    super(26);
  }

  override readonly text = 'Critical Kills Always Give Rage Bonus';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100149;

  override readonly rerollWeight = 100;
}

class Skill027 extends BaseSkill {
  constructor() {
    super(27);
  }

  override readonly text = 'Critical Kills Drains HP from Random';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100148;

  override readonly rerollWeight = 100;
}

class Skill028 extends BaseSkill {
  constructor() {
    super(28);
  }

  override readonly text = 'Every 10th Attack Hits All In Sight';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100144;

  override readonly rerollWeight = 100;
}

class Skill029 extends BaseSkill {
  constructor() {
    super(29);
  }

  override readonly text = 'Critical Kills Increase Max HP by 18';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100147;

  override readonly rerollWeight = 100;
}

class Skill030 extends BaseSkill {
  constructor() {
    super(30);
  }

  override readonly text = 'Damage to Enemies Behind Doubles';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100143;

  override readonly rerollWeight = 100;
}

class Skill031 extends BaseSkill {
  constructor() {
    super(31);
  }

  override readonly text = 'Deal 55 Damage to All Nearby Enemies Now';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100051;

  override readonly rerollWeight = 100;
}

class Skill032 extends BaseSkill {
  constructor() {
    super(32);
  }

  override readonly text = 'Deal 11 Damage to Melee Enemies On Sight';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100050;

  override readonly rerollWeight = 100;
}

class Skill033 extends BaseSkill {
  constructor() {
    super(33);
  }

  override readonly text = 'Deflect Every 4th Attack';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000054;

  override readonly rerollWeight = 0;
}

class Skill034 extends BaseSkill {
  constructor() {
    super(34);
  }

  override readonly text = 'Dodge has 20% Change to Explode Enemy';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000052;

  override readonly rerollWeight = 0;
}

class Skill035 extends BaseSkill {
  constructor() {
    super(35);
  }

  override readonly text = 'Dodging Drains 7hp';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100160;

  override readonly rerollWeight = 100;
}

class Skill036 extends BaseSkill {
  constructor() {
    super(36);
  }

  override readonly text = '+25% Dodge for Next Attack After Dodging';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000051;

  override readonly rerollWeight = 0;
}

class Skill037 extends BaseSkill {
  constructor() {
    super(37);
  }

  override readonly text = 'Dodge Next 12 Attacks';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100049;

  override readonly rerollWeight = 100;
}

class Skill038 extends BaseSkill {
  constructor() {
    super(38);
  }

  override readonly text = 'Dodging Ranged Attacks Returns Them';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100125;

  override readonly rerollWeight = 100;
}

class Skill039 extends BaseSkill {
  constructor() {
    super(39);
  }

  override readonly text = 'Dodging Twice in a Row Heals 20 HP';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000030;

  override readonly rerollWeight = 0;
}

class Skill040 extends BaseSkill {
  constructor() {
    super(40);
  }

  override readonly text = 'Failing to Dodge 8 Arrow in a Row Fully Heals';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100045;

  override readonly rerollWeight = 100;
}

class Skill041 extends BaseSkill {
  constructor() {
    super(41);
  }

  override readonly text = 'Dodging Melee Hits Enemy Behind';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000050;

  override readonly rerollWeight = 0;
}

class Skill042 extends BaseSkill {
  constructor() {
    super(42);
  }

  override readonly text = 'Dodging Does 6 Damage to All Enemies Behind';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100159;

  override readonly rerollWeight = 100;
}

class Skill043 extends BaseSkill {
  constructor() {
    super(43);
  }

  override readonly text = 'Overhealing Deals Damage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100132;

  override readonly rerollWeight = 100;
}

class Skill044 extends BaseSkill {
  constructor() {
    super(44);
  }

  override readonly text = 'Dodging Ranged Repairs 16 Armor';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000053;

  override readonly rerollWeight = 0;
}

class Skill045 extends BaseSkill {
  constructor() {
    super(45);
  }

  override readonly text = 'Drain 80 HP from Nearby Enemy Now';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100041;

  override readonly rerollWeight = 100;
}

class Skill046 extends BaseSkill {
  constructor() {
    super(46);
  }

  override readonly text = 'Damage to Enemy In Back Drains 7 HP from Random';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100124;

  override readonly rerollWeight = 100;
}

class Skill047 extends BaseSkill {
  constructor() {
    super(47);
  }

  override readonly text = 'Potions Make Nearby Enemies Take +250% Damage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100135;

  override readonly rerollWeight = 100;
}

class Skill048 extends BaseSkill {
  constructor() {
    super(48);
  }

  override readonly text = 'Potions Deflect Damage for 9.5 Seconds';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000112;

  override readonly rerollWeight = 0;
}

class Skill049 extends BaseSkill {
  constructor() {
    super(49);
  }

  override readonly text = 'Potions Will Mark Enemy to Explode';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100133;

  override readonly rerollWeight = 100;
}

class Skill050 extends BaseSkill {
  constructor() {
    super(50);
  }

  override readonly text = 'Enemies have 20% Chance to be Executed On Sight';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100130;

  override readonly rerollWeight = 100;
}

class Skill051 extends BaseSkill {
  constructor() {
    super(51);
  }

  override readonly text = 'Attack has 30% Change to Hit Next Enemy';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000031;

  override readonly rerollWeight = 0;
}

class Skill052 extends BaseSkill {
  constructor() {
    super(52);
  }

  override readonly text = 'Each Kill Stuns One Archer for 5.5 Seconds';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000034;

  override readonly rerollWeight = 0;
}

class Skill053 extends BaseSkill {
  constructor() {
    super(53);
  }

  override readonly text = 'Enemies 3rd Melee Attack Heals and Repairs Armor';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000055;

  override readonly rerollWeight = 0;
}

class Skill054 extends BaseSkill {
  constructor() {
    super(54);
  }

  override readonly text = 'Enemies Never Damage HP and Armor Simultaneously';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100131;

  override readonly rerollWeight = 100;
}

class Skill055 extends BaseSkill {
  constructor() {
    super(55);
  }

  override readonly text = 'When Dying, Enemy Attacks Ally in Front of it For 4x Damage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100034;

  override readonly rerollWeight = 100;
}

class Skill056 extends BaseSkill {
  constructor() {
    super(56);
  }

  override readonly text = 'Critical Chance +3.5% per Hit Taken, Resets on Critical Hit';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000088;

  override readonly rerollWeight = 0;
}

class Skill057 extends BaseSkill {
  constructor() {
    super(57);
  }

  override readonly text = 'Every 3rd Critical Hit Does +350% Damage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100150;

  override readonly rerollWeight = 100;
}

class Skill058 extends BaseSkill {
  constructor() {
    super(58);
  }

  override readonly text = 'Every Fifth Attack Hits Next Enemy, Dealing 200% Damage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100129;

  override readonly rerollWeight = 100;
}

class Skill059 extends BaseSkill {
  constructor() {
    super(59);
  }

  override readonly text = 'If First Enemy After Halting is an Archer, Execute it';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100052;

  override readonly rerollWeight = 100;
}

class Skill060 extends BaseSkill {
  constructor() {
    super(60);
  }

  override readonly text = 'Explode One Random Nearby Enemy Now';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100047;

  override readonly rerollWeight = 100;
}

class Skill061 extends BaseSkill {
  constructor() {
    super(61);
  }

  override readonly text = 'Receiving an Angel of Death Doubles it';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100039;

  override readonly rerollWeight = 100;
}

class Skill062 extends BaseSkill {
  constructor() {
    super(62);
  }

  override readonly text = 'Potions Increase Damage by +375% for 3 Attacks';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100134;

  override readonly rerollWeight = 100;
}

class Skill063 extends BaseSkill {
  constructor() {
    super(63);
  }

  override readonly text = 'Heal 25 HP for Killing Enemy Unstruck';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100053;

  override readonly rerollWeight = 100;
}

class Skill064 extends BaseSkill {
  constructor() {
    super(64);
  }

  override readonly text = 'Heal 6 HP for Each Arrow Fired';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100181;

  override readonly rerollWeight = 100;
}

class Skill065 extends BaseSkill {
  constructor() {
    super(65);
  }

  override readonly text = 'Fire 8 Air Arrows (2-29 Dmg) Now';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100054;

  override readonly rerollWeight = 100;
}

class Skill066 extends BaseSkill {
  constructor() {
    super(66);
  }

  override readonly text = 'First Attack After Halting Heals';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100178;

  override readonly rerollWeight = 100;
}

class Skill067 extends BaseSkill {
  constructor() {
    super(67);
  }

  override readonly text = 'First Attack After Repairs Armor';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100177;

  override readonly rerollWeight = 100;
}

class Skill068 extends BaseSkill {
  constructor() {
    super(68);
  }

  override readonly text = 'Automatically Drink Potions at 0 HP';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100030;

  override readonly rerollWeight = 100;
}

class Skill069 extends BaseSkill {
  constructor() {
    super(69);
  }

  override readonly text = 'Fountains also Give Gold';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100031;

  override readonly rerollWeight = 100;
}

class Skill070 extends BaseSkill {
  constructor() {
    super(70);
  }

  override readonly text = 'Heal Fountains Increases Max HP';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100040;

  override readonly rerollWeight = 100;
}

class Skill071 extends BaseSkill {
  constructor() {
    super(71);
  }

  override readonly text = 'Fountains also Repair Armor';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100044;

  override readonly rerollWeight = 100;
}

class Skill072 extends BaseSkill {
  constructor() {
    super(72);
  }

  override readonly text = 'Full Armor Sets Dodge to 85%';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100056;

  override readonly rerollWeight = 100;
}

class Skill073 extends BaseSkill {
  constructor() {
    super(73);
  }

  override readonly text = 'Getting Fully Healed Repairs 30 Armor';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100055;

  override readonly rerollWeight = 100;
}

class Skill074 extends BaseSkill {
  constructor() {
    super(74);
  }

  override readonly text = '+300 Damage every 5th Attack';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100123;

  override readonly rerollWeight = 100;
}

class Skill075 extends BaseSkill {
  constructor() {
    super(75);
  }

  override readonly text = 'Repairing Armor Deals Damage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100145;

  override readonly rerollWeight = 100;
}

class Skill076 extends BaseSkill {
  constructor() {
    super(76);
  }

  override readonly text = 'Get 1 Random Rare Skill Now';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100176;

  override readonly rerollWeight = 100;
}

class Skill077 extends BaseSkill {
  constructor() {
    super(77);
  }

  override readonly text = 'Heal 23 HP Every Time Enemy Drops Gold';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100163;

  override readonly rerollWeight = 100;
}

class Skill078 extends BaseSkill {
  constructor() {
    super(78);
  }

  override readonly text = 'Deal 33 Damage Every Time an Enemy Drops Gold';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100162;

  override readonly rerollWeight = 100;
}

class Skill079 extends BaseSkill {
  constructor() {
    super(79);
  }

  override readonly text = 'Having Armor Increases Dodge by 15%';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100175;

  override readonly rerollWeight = 100;
}

class Skill080 extends BaseSkill {
  constructor() {
    super(80);
  }

  override readonly text = '0 Armor Increases Melee Dodge by 15%';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100174;

  override readonly rerollWeight = 100;
}

class Skill081 extends BaseSkill {
  constructor() {
    super(81);
  }

  override readonly text = 'Surviving with 11HP and 0 Armor Repairs All Armor';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100033;

  override readonly rerollWeight = 100;
}

class Skill082 extends BaseSkill {
  constructor() {
    super(82);
  }

  override readonly text = 'Healing on Level Up +30 HP';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100032;

  override readonly rerollWeight = 100;
}

class Skill083 extends BaseSkill {
  constructor() {
    super(83);
  }

  override readonly text = 'Healing Fountains also Give Rage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100057;

  override readonly rerollWeight = 100;
}

class Skill084 extends BaseSkill {
  constructor() {
    super(84);
  }

  override readonly text = 'Fully Heal Once After Killing 10 Enemies';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100048;

  override readonly rerollWeight = 100;
}

class Skill085 extends BaseSkill {
  constructor() {
    super(85);
  }

  override readonly text = 'Heal 20 HP when Armor Depletes';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100043;

  override readonly rerollWeight = 100;
}

class Skill086 extends BaseSkill {
  constructor() {
    super(86);
  }

  override readonly text = 'Also Heal Equivalent to Armor at Camps';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100042;

  override readonly rerollWeight = 100;
}

class Skill087 extends BaseSkill {
  constructor() {
    super(87);
  }

  override readonly text = '35% Change for Ranged Attacks to Heal';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100180;

  override readonly rerollWeight = 100;
}

class Skill088 extends BaseSkill {
  constructor() {
    super(88);
  }

  override readonly text = 'Healing Deals 13 Thorn Damage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100179;

  override readonly rerollWeight = 100;
}

class Skill089 extends BaseSkill {
  constructor() {
    super(89);
  }

  override readonly text = 'Heal Fully Now';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100058;

  override readonly rerollWeight = 100;
}

class Skill090 extends BaseSkill {
  constructor() {
    super(90);
  }

  override readonly text = 'Heal 22HP Every 4 Seconds Spent Running';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100161;

  override readonly rerollWeight = 100;
}

class Skill091 extends BaseSkill {
  constructor() {
    super(91);
  }

  override readonly text = 'Dodge is 80% if HP less than 34';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000091;

  override readonly rerollWeight = 0;
}

class Skill092 extends BaseSkill {
  constructor() {
    super(92);
  }

  override readonly text = 'Every Attack Deals 6 Damage to Enemy in Back';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100173;

  override readonly rerollWeight = 100;
}

class Skill093 extends BaseSkill {
  constructor() {
    super(93);
  }

  override readonly text =
    'Archers Behind, when Damaged, will shoot Ally (5.5x Dmg); Archers Behind, when Damaged, will shoot All Allies (3x Dmg)';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100060;

  override readonly rerollWeight = 100;
}

class Skill094 extends BaseSkill {
  constructor() {
    super(94);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  override readonly pickWeight = 0;

  override readonly rerollWeight = 100;
}

class Skill095 extends BaseSkill {
  constructor() {
    super(95);
  }

  override readonly text = '70% Change for Lethal Attacks to Hit Random Enemy Instead';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100029;

  override readonly rerollWeight = 100;
}

class Skill096 extends BaseSkill {
  constructor() {
    super(96);
  }

  override readonly text = '+55% Critical Chance on Archers';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000085;

  override readonly rerollWeight = 0;
}

class Skill097 extends BaseSkill {
  constructor() {
    super(97);
  }

  override readonly text = 'Chance for Enemy to Drop Gold +110%';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100038;

  override readonly rerollWeight = 100;
}

class Skill098 extends BaseSkill {
  constructor() {
    super(98);
  }

  override readonly text = 'Getting Common SKills Increases Max Armor by 24';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100037;

  override readonly rerollWeight = 100;
}

class Skill099 extends BaseSkill {
  constructor() {
    super(99);
  }

  override readonly text = '+19 Max HP at Level Up';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100036;

  override readonly rerollWeight = 100;
}

class Skill100 extends BaseSkill {
  constructor() {
    super(100);
  }

  override readonly text = 'Execute 1 Random Enemy at Level Up';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100035;

  override readonly rerollWeight = 100;
}

class Skill101 extends BaseSkill {
  constructor() {
    super(101);
  }

  override readonly text = 'Every 8th Critical Hit Executes the Enemy';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000084;

  override readonly rerollWeight = 0;
}

class Skill102 extends BaseSkill {
  constructor() {
    super(102);
  }

  override readonly text = 'Instant Level Up at Camp';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100146;

  override readonly rerollWeight = 100;
}

class Skill103 extends BaseSkill {
  constructor() {
    super(103);
  }

  override readonly text = 'Killing Enemy Behind Heals 25HP';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100152;

  override readonly rerollWeight = 100;
}

class Skill104 extends BaseSkill {
  constructor() {
    super(104);
  }

  override readonly text = 'Killing deals 17 Thorn Damage to Random';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100151;

  override readonly rerollWeight = 100;
}

class Skill105 extends BaseSkill {
  constructor() {
    super(105);
  }

  override readonly text = 'Killing an Enemy Behind Fires 3 Air Arrows 2-24Dmg';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100046;

  override readonly rerollWeight = 100;
}

class Skill106 extends BaseSkill {
  constructor() {
    super(106);
  }

  override readonly text = 'Every Kill increases Ranged Dodge by 1%';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000049;

  override readonly rerollWeight = 0;
}

class Skill107 extends BaseSkill {
  constructor() {
    super(107);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100028;

  override readonly rerollWeight = 100;
}

class Skill108 extends BaseSkill {
  constructor() {
    super(108);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100027;

  override readonly rerollWeight = 100;
}

class Skill109 extends BaseSkill {
  constructor() {
    super(109);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100026;

  override readonly rerollWeight = 100;
}

class Skill110 extends BaseSkill {
  constructor() {
    super(110);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100025;

  override readonly rerollWeight = 100;
}

class Skill111 extends BaseSkill {
  constructor() {
    super(111);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100024;

  override readonly rerollWeight = 100;
}

class Skill112 extends BaseSkill {
  constructor() {
    super(112);
  }

  override readonly text = 'TODO: Add skill description. Tuned scoring example.';

  override readonly tags = ['example', 'balanced', 'tuned'] as const;

  override readonly pickWeight = 1000029;

  override readonly offensivePickWeight = (context: SkillEvaluationContext) =>
    context.activeSkills.size < 12 ? 1000120 : 1000060;

  override readonly defensivePickWeight = 1000005;

  override readonly rerollWeight = (context: SkillEvaluationContext) => {
    if (context.rarity === 'epic') {
      return 0;
    }

    return context.activeSkills.size < 8 ? 10 : 35;
  };
}

class Skill113 extends BaseSkill {
  constructor() {
    super(113);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100023;

  override readonly rerollWeight = 100;
}

class Skill114 extends BaseSkill {
  constructor() {
    super(114);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100022;

  override readonly rerollWeight = 100;
}

class Skill115 extends BaseSkill {
  constructor() {
    super(115);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100021;

  override readonly rerollWeight = 100;
}

class Skill116 extends BaseSkill {
  constructor() {
    super(116);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100020;

  override readonly rerollWeight = 100;
}

class Skill117 extends BaseSkill {
  constructor() {
    super(117);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100019;

  override readonly rerollWeight = 100;
}

class Skill118 extends BaseSkill {
  constructor() {
    super(118);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100018;

  override readonly rerollWeight = 100;
}

class Skill119 extends BaseSkill {
  constructor() {
    super(119);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100017;

  override readonly rerollWeight = 100;
}

class Skill120 extends BaseSkill {
  constructor() {
    super(120);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100016;

  override readonly rerollWeight = 100;
}

class Skill121 extends BaseSkill {
  constructor() {
    super(121);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100015;

  override readonly rerollWeight = 100;
}

class Skill122 extends BaseSkill {
  constructor() {
    super(122);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100104;

  override readonly rerollWeight = 100;
}

class Skill123 extends BaseSkill {
  constructor() {
    super(123);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100103;

  override readonly rerollWeight = 100;
}

class Skill124 extends BaseSkill {
  constructor() {
    super(124);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100102;

  override readonly rerollWeight = 100;
}

class Skill125 extends BaseSkill {
  constructor() {
    super(125);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100101;

  override readonly rerollWeight = 100;
}

class Skill126 extends BaseSkill {
  constructor() {
    super(126);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100100;

  override readonly rerollWeight = 100;
}

class Skill127 extends BaseSkill {
  constructor() {
    super(127);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100014;

  override readonly rerollWeight = 100;
}

class Skill128 extends BaseSkill {
  constructor() {
    super(128);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100013;

  override readonly rerollWeight = 100;
}

class Skill129 extends BaseSkill {
  constructor() {
    super(129);
  }

  override readonly text = 'Ranged Dodge +17.5%';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000081;

  override readonly rerollWeight = 0;
}

class Skill130 extends BaseSkill {
  constructor() {
    super(130);
  }

  override readonly text = 'dodging ranged stabs';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000048;

  override readonly rerollWeight = 0;
}

class Skill131 extends BaseSkill {
  constructor() {
    super(131);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100099;

  override readonly rerollWeight = 100;
}

class Skill132 extends BaseSkill {
  constructor() {
    super(132);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100098;

  override readonly rerollWeight = 100;
}

class Skill133 extends BaseSkill {
  constructor() {
    super(133);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100097;

  override readonly rerollWeight = 100;
}

class Skill134 extends BaseSkill {
  constructor() {
    super(134);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100012;

  override readonly rerollWeight = 100;
}

class Skill135 extends BaseSkill {
  constructor() {
    super(135);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100096;

  override readonly rerollWeight = 100;
}

class Skill136 extends BaseSkill {
  constructor() {
    super(136);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100095;

  override readonly rerollWeight = 100;
}

class Skill137 extends BaseSkill {
  constructor() {
    super(137);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100094;

  override readonly rerollWeight = 100;
}

class Skill138 extends BaseSkill {
  constructor() {
    super(138);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100093;

  override readonly rerollWeight = 100;
}

class Skill139 extends BaseSkill {
  constructor() {
    super(139);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100092;

  override readonly rerollWeight = 100;
}

class Skill140 extends BaseSkill {
  constructor() {
    super(140);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100091;

  override readonly rerollWeight = 100;
}

class Skill141 extends BaseSkill {
  constructor() {
    super(141);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100090;

  override readonly rerollWeight = 100;
}

class Skill142 extends BaseSkill {
  constructor() {
    super(142);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100089;

  override readonly rerollWeight = 100;
}

class Skill143 extends BaseSkill {
  constructor() {
    super(143);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100106;

  override readonly rerollWeight = 100;
}

class Skill144 extends BaseSkill {
  constructor() {
    super(144);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100105;

  override readonly rerollWeight = 100;
}

class Skill145 extends BaseSkill {
  constructor() {
    super(145);
  }

  override readonly text = 'reroll';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000001;

  override readonly rerollWeight = 0;
}

class Skill146 extends BaseSkill {
  constructor() {
    super(146);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100108;

  override readonly rerollWeight = 100;
}

class Skill147 extends BaseSkill {
  constructor() {
    super(147);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100107;

  override readonly rerollWeight = 100;
}

class Skill148 extends BaseSkill {
  constructor() {
    super(148);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100088;

  override readonly rerollWeight = 100;
}

class Skill149 extends BaseSkill {
  constructor() {
    super(149);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100087;

  override readonly rerollWeight = 100;
}

class Skill150 extends BaseSkill {
  constructor() {
    super(150);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100086;

  override readonly rerollWeight = 100;
}

class Skill151 extends BaseSkill {
  constructor() {
    super(151);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100085;

  override readonly rerollWeight = 100;
}

class Skill152 extends BaseSkill {
  constructor() {
    super(152);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100084;

  override readonly rerollWeight = 100;
}

class Skill153 extends BaseSkill {
  constructor() {
    super(153);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100083;

  override readonly rerollWeight = 100;
}

class Skill154 extends BaseSkill {
  constructor() {
    super(154);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100082;

  override readonly rerollWeight = 100;
}

class Skill155 extends BaseSkill {
  constructor() {
    super(155);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100081;

  override readonly rerollWeight = 100;
}

class Skill156 extends BaseSkill {
  constructor() {
    super(156);
  }

  override readonly text = 'xx Damage Behind Stuns';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100172;

  override readonly rerollWeight = 100;
}

class Skill157 extends BaseSkill {
  constructor() {
    super(157);
  }

  override readonly text = 'Potions Stuns Nearby Enemies for 10.5 Seconds';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000111;

  override readonly rerollWeight = 0;
}

class Skill158 extends BaseSkill {
  constructor() {
    super(158);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100080;

  override readonly rerollWeight = 100;
}

class Skill159 extends BaseSkill {
  constructor() {
    super(159);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100079;

  override readonly rerollWeight = 100;
}

class Skill160 extends BaseSkill {
  constructor() {
    super(160);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100078;

  override readonly rerollWeight = 100;
}

class Skill161 extends BaseSkill {
  constructor() {
    super(161);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100077;

  override readonly rerollWeight = 100;
}

class Skill162 extends BaseSkill {
  constructor() {
    super(162);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100076;

  override readonly rerollWeight = 100;
}

class Skill163 extends BaseSkill {
  constructor() {
    super(163);
  }

  override readonly text = 'first attack after halt 3.5x dmg';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100182;

  override readonly rerollWeight = 100;
}

class Skill164 extends BaseSkill {
  constructor() {
    super(164);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  override readonly pickWeight = 0;

  override readonly rerollWeight = 100;
}

class Skill165 extends BaseSkill {
  constructor() {
    super(165);
  }

  override readonly text = 'halting inc dodge and crit';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000096;

  override readonly rerollWeight = 0;
}

class Skill166 extends BaseSkill {
  constructor() {
    super(166);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000026;

  override readonly rerollWeight = 0;
}

class Skill167 extends BaseSkill {
  constructor() {
    super(167);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100109;

  override readonly rerollWeight = 100;
}

class Skill168 extends BaseSkill {
  constructor() {
    super(168);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100110;

  override readonly rerollWeight = 100;
}

class Skill169 extends BaseSkill {
  constructor() {
    super(169);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100111;

  override readonly rerollWeight = 100;
}

class Skill170 extends BaseSkill {
  constructor() {
    super(170);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100112;

  override readonly rerollWeight = 100;
}

class Skill171 extends BaseSkill {
  constructor() {
    super(171);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000025;

  override readonly rerollWeight = 0;
}

class Skill172 extends BaseSkill {
  constructor() {
    super(172);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000024;

  override readonly rerollWeight = 0;
}

class Skill173 extends BaseSkill {
  constructor() {
    super(173);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000023;

  override readonly rerollWeight = 0;
}

class Skill174 extends BaseSkill {
  constructor() {
    super(174);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000022;

  override readonly rerollWeight = 0;
}

class Skill175 extends BaseSkill {
  constructor() {
    super(175);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000047;

  override readonly rerollWeight = 0;
}

class Skill176 extends BaseSkill {
  constructor() {
    super(176);
  }

  override readonly text = '2 crits heals';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000110;

  override readonly rerollWeight = 0;
}

class Skill177 extends BaseSkill {
  constructor() {
    super(177);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100171;

  override readonly rerollWeight = 100;
}

class Skill178 extends BaseSkill {
  constructor() {
    super(178);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100170;

  override readonly rerollWeight = 100;
}

class Skill179 extends BaseSkill {
  constructor() {
    super(179);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100011;

  override readonly rerollWeight = 100;
}

class Skill180 extends BaseSkill {
  constructor() {
    super(180);
  }

  override readonly text = 'deflect after kill';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000080;

  override readonly rerollWeight = 0;
}

class Skill181 extends BaseSkill {
  constructor() {
    super(181);
  }

  override readonly text = 'deflect after level';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000079;

  override readonly rerollWeight = 0;
}

class Skill182 extends BaseSkill {
  constructor() {
    super(182);
  }

  override readonly text = 'dodge +17.5%';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000095;

  override readonly rerollWeight = 0;
}

class Skill183 extends BaseSkill {
  constructor() {
    super(183);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000046;

  override readonly rerollWeight = 0;
}

class Skill184 extends BaseSkill {
  constructor() {
    super(184);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100113;

  override readonly rerollWeight = 100;
}

class Skill185 extends BaseSkill {
  constructor() {
    super(185);
  }

  override readonly text = 'double dodge ranged';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000094;

  override readonly rerollWeight = 0;
}

class Skill186 extends BaseSkill {
  constructor() {
    super(186);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100114;

  override readonly rerollWeight = 100;
}

class Skill187 extends BaseSkill {
  constructor() {
    super(187);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100169;

  override readonly rerollWeight = 100;
}

class Skill188 extends BaseSkill {
  constructor() {
    super(188);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100010;

  override readonly rerollWeight = 100;
}

class Skill189 extends BaseSkill {
  constructor() {
    super(189);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100009;

  override readonly rerollWeight = 100;
}

class Skill190 extends BaseSkill {
  constructor() {
    super(190);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100075;

  override readonly rerollWeight = 100;
}

class Skill191 extends BaseSkill {
  constructor() {
    super(191);
  }

  override readonly text = 'Crit stuns';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000114;

  override readonly rerollWeight = 0;
}

class Skill192 extends BaseSkill {
  constructor() {
    super(192);
  }

  override readonly text = 'Crit refils';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000113;

  override readonly rerollWeight = 0;
}

class Skill193 extends BaseSkill {
  constructor() {
    super(193);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100074;

  override readonly rerollWeight = 100;
}

class Skill194 extends BaseSkill {
  constructor() {
    super(194);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100073;

  override readonly rerollWeight = 100;
}

class Skill195 extends BaseSkill {
  constructor() {
    super(195);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100168;

  override readonly rerollWeight = 100;
}

class Skill196 extends BaseSkill {
  constructor() {
    super(196);
  }

  override readonly text = 'dodge stuns';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000109;

  override readonly rerollWeight = 0;
}

class Skill197 extends BaseSkill {
  constructor() {
    super(197);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100142;

  override readonly rerollWeight = 100;
}

class Skill198 extends BaseSkill {
  constructor() {
    super(198);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100072;

  override readonly rerollWeight = 100;
}

class Skill199 extends BaseSkill {
  constructor() {
    super(199);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100141;

  override readonly rerollWeight = 100;
}

class Skill200 extends BaseSkill {
  constructor() {
    super(200);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100140;

  override readonly rerollWeight = 100;
}

class Skill201 extends BaseSkill {
  constructor() {
    super(201);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100139;

  override readonly rerollWeight = 100;
}

class Skill202 extends BaseSkill {
  constructor() {
    super(202);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000078;

  override readonly rerollWeight = 0;
}

class Skill203 extends BaseSkill {
  constructor() {
    super(203);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100007;

  override readonly rerollWeight = 100;
}

class Skill204 extends BaseSkill {
  constructor() {
    super(204);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100006;

  override readonly rerollWeight = 100;
}

class Skill205 extends BaseSkill {
  constructor() {
    super(205);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100005;

  override readonly rerollWeight = 100;
}

class Skill206 extends BaseSkill {
  constructor() {
    super(206);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100071;

  override readonly rerollWeight = 100;
}

class Skill207 extends BaseSkill {
  constructor() {
    super(207);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100070;

  override readonly rerollWeight = 100;
}

class Skill208 extends BaseSkill {
  constructor() {
    super(208);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100167;

  override readonly rerollWeight = 100;
}

class Skill209 extends BaseSkill {
  constructor() {
    super(209);
  }

  override readonly text = '0 armor inc crit %';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000108;

  override readonly rerollWeight = 0;
}

class Skill210 extends BaseSkill {
  constructor() {
    super(210);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100166;

  override readonly rerollWeight = 100;
}

class Skill211 extends BaseSkill {
  constructor() {
    super(211);
  }

  override readonly text = 'crit heals';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000107;

  override readonly rerollWeight = 0;
}

class Skill212 extends BaseSkill {
  constructor() {
    super(212);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100115;

  override readonly rerollWeight = 100;
}

class Skill213 extends BaseSkill {
  constructor() {
    super(213);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000045;

  override readonly rerollWeight = 0;
}

class Skill214 extends BaseSkill {
  constructor() {
    super(214);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100004;

  override readonly rerollWeight = 100;
}

class Skill215 extends BaseSkill {
  constructor() {
    super(215);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000077;

  override readonly rerollWeight = 0;
}

class Skill216 extends BaseSkill {
  constructor() {
    super(216);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100158;

  override readonly rerollWeight = 100;
}

class Skill217 extends BaseSkill {
  constructor() {
    super(217);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100069;

  override readonly rerollWeight = 100;
}

class Skill218 extends BaseSkill {
  constructor() {
    super(218);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100068;

  override readonly rerollWeight = 100;
}

class Skill219 extends BaseSkill {
  constructor() {
    super(219);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100067;

  override readonly rerollWeight = 100;
}

class Skill220 extends BaseSkill {
  constructor() {
    super(220);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100116;

  override readonly rerollWeight = 100;
}

class Skill221 extends BaseSkill {
  constructor() {
    super(221);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100117;

  override readonly rerollWeight = 100;
}

class Skill222 extends BaseSkill {
  constructor() {
    super(222);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100118;

  override readonly rerollWeight = 100;
}

class Skill223 extends BaseSkill {
  constructor() {
    super(223);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100119;

  override readonly rerollWeight = 100;
}

class Skill224 extends BaseSkill {
  constructor() {
    super(224);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100165;

  override readonly rerollWeight = 100;
}

class Skill225 extends BaseSkill {
  constructor() {
    super(225);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000044;

  override readonly rerollWeight = 0;
}

class Skill226 extends BaseSkill {
  constructor() {
    super(226);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000043;

  override readonly rerollWeight = 0;
}

class Skill227 extends BaseSkill {
  constructor() {
    super(227);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000042;

  override readonly rerollWeight = 0;
}

class Skill228 extends BaseSkill {
  constructor() {
    super(228);
  }

  override readonly text = 'dodge refils';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000106;

  override readonly rerollWeight = 0;
}

class Skill229 extends BaseSkill {
  constructor() {
    super(229);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100121;

  override readonly rerollWeight = 100;
}

class Skill230 extends BaseSkill {
  constructor() {
    super(230);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100120;

  override readonly rerollWeight = 100;
}

class Skill231 extends BaseSkill {
  constructor() {
    super(231);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000021;

  override readonly rerollWeight = 0;
}

class Skill232 extends BaseSkill {
  constructor() {
    super(232);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100066;

  override readonly rerollWeight = 100;
}

class Skill233 extends BaseSkill {
  constructor() {
    super(233);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100065;

  override readonly rerollWeight = 100;
}

class Skill234 extends BaseSkill {
  constructor() {
    super(234);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100064;

  override readonly rerollWeight = 100;
}

class Skill235 extends BaseSkill {
  constructor() {
    super(235);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000020;

  override readonly rerollWeight = 0;
}

class Skill236 extends BaseSkill {
  constructor() {
    super(236);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000019;

  override readonly rerollWeight = 0;
}

class Skill237 extends BaseSkill {
  constructor() {
    super(237);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100063;

  override readonly rerollWeight = 100;
}

class Skill238 extends BaseSkill {
  constructor() {
    super(238);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000018;

  override readonly rerollWeight = 0;
}

class Skill239 extends BaseSkill {
  constructor() {
    super(239);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100138;

  override readonly rerollWeight = 100;
}

class Skill240 extends BaseSkill {
  constructor() {
    super(240);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100062;

  override readonly rerollWeight = 100;
}

class Skill241 extends BaseSkill {
  constructor() {
    super(241);
  }

  override readonly text = 'triple rage';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100183;

  override readonly rerollWeight = 100;
}

class Skill242 extends BaseSkill {
  constructor() {
    super(242);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100008;

  override readonly rerollWeight = 100;
}

class Skill243 extends BaseSkill {
  constructor() {
    super(243);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100061;

  override readonly rerollWeight = 100;
}

class Skill244 extends BaseSkill {
  constructor() {
    super(244);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000017;

  override readonly rerollWeight = 0;
}

class Skill245 extends BaseSkill {
  constructor() {
    super(245);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000016;

  override readonly rerollWeight = 0;
}

class Skill246 extends BaseSkill {
  constructor() {
    super(246);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000015;

  override readonly rerollWeight = 0;
}

class Skill247 extends BaseSkill {
  constructor() {
    super(247);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000014;

  override readonly rerollWeight = 0;
}

class Skill248 extends BaseSkill {
  constructor() {
    super(248);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000013;

  override readonly rerollWeight = 0;
}

class Skill249 extends BaseSkill {
  constructor() {
    super(249);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000012;

  override readonly rerollWeight = 0;
}

class Skill250 extends BaseSkill {
  constructor() {
    super(250);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000011;

  override readonly rerollWeight = 0;
}

class Skill251 extends BaseSkill {
  constructor() {
    super(251);
  }

  override readonly text = 'block archers in combat; crit hits all';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000105;

  override readonly rerollWeight = 0;
}

class Skill252 extends BaseSkill {
  constructor() {
    super(252);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['unconfigured'] as const;

  override readonly pickWeight = 0;

  override readonly rerollWeight = 100;
}

class Skill253 extends BaseSkill {
  constructor() {
    super(253);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000028;

  override readonly rerollWeight = 0;
}

class Skill254 extends BaseSkill {
  constructor() {
    super(254);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000027;

  override readonly rerollWeight = 0;
}

class Skill255 extends BaseSkill {
  constructor() {
    super(255);
  }

  override readonly text = 'crit stuns all,';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000115;

  override readonly rerollWeight = 0;
}

class Skill256 extends BaseSkill {
  constructor() {
    super(256);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000076;

  override readonly rerollWeight = 0;
}

class Skill257 extends BaseSkill {
  constructor() {
    super(257);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000010;

  override readonly rerollWeight = 0;
}

class Skill258 extends BaseSkill {
  constructor() {
    super(258);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000009;

  override readonly rerollWeight = 0;
}

class Skill259 extends BaseSkill {
  constructor() {
    super(259);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000008;

  override readonly rerollWeight = 0;
}

class Skill260 extends BaseSkill {
  constructor() {
    super(260);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000007;

  override readonly rerollWeight = 0;
}

class Skill261 extends BaseSkill {
  constructor() {
    super(261);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100122;

  override readonly rerollWeight = 100;
}

class Skill262 extends BaseSkill {
  constructor() {
    super(262);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000075;

  override readonly rerollWeight = 0;
}

class Skill263 extends BaseSkill {
  constructor() {
    super(263);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000074;

  override readonly rerollWeight = 0;
}

class Skill264 extends BaseSkill {
  constructor() {
    super(264);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000073;

  override readonly rerollWeight = 0;
}

class Skill265 extends BaseSkill {
  constructor() {
    super(265);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000072;

  override readonly rerollWeight = 0;
}

class Skill266 extends BaseSkill {
  constructor() {
    super(266);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000071;

  override readonly rerollWeight = 0;
}

class Skill267 extends BaseSkill {
  constructor() {
    super(267);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000097;

  override readonly rerollWeight = 0;
}

class Skill268 extends BaseSkill {
  constructor() {
    super(268);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000006;

  override readonly rerollWeight = 0;
}

class Skill269 extends BaseSkill {
  constructor() {
    super(269);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000005;

  override readonly rerollWeight = 0;
}

class Skill270 extends BaseSkill {
  constructor() {
    super(270);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100003;

  override readonly rerollWeight = 100;
}

class Skill271 extends BaseSkill {
  constructor() {
    super(271);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000004;

  override readonly rerollWeight = 0;
}

class Skill272 extends BaseSkill {
  constructor() {
    super(272);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000003;

  override readonly rerollWeight = 0;
}

class Skill273 extends BaseSkill {
  constructor() {
    super(273);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000002;

  override readonly rerollWeight = 0;
}

class Skill274 extends BaseSkill {
  constructor() {
    super(274);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000070;

  override readonly rerollWeight = 0;
}

class Skill275 extends BaseSkill {
  constructor() {
    super(275);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000069;

  override readonly rerollWeight = 0;
}

class Skill276 extends BaseSkill {
  constructor() {
    super(276);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000068;

  override readonly rerollWeight = 0;
}

class Skill277 extends BaseSkill {
  constructor() {
    super(277);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000067;

  override readonly rerollWeight = 0;
}

class Skill278 extends BaseSkill {
  constructor() {
    super(278);
  }

  override readonly text = '60% chance keep potion';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000101;

  override readonly rerollWeight = 0;
}

class Skill279 extends BaseSkill {
  constructor() {
    super(279);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100137;

  override readonly rerollWeight = 100;
}

class Skill280 extends BaseSkill {
  constructor() {
    super(280);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100136;

  override readonly rerollWeight = 100;
}

class Skill281 extends BaseSkill {
  constructor() {
    super(281);
  }

  override readonly text = '20 % refill on kill';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000100;

  override readonly rerollWeight = 0;
}

class Skill282 extends BaseSkill {
  constructor() {
    super(282);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000066;

  override readonly rerollWeight = 0;
}

class Skill283 extends BaseSkill {
  constructor() {
    super(283);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000065;

  override readonly rerollWeight = 0;
}

class Skill284 extends BaseSkill {
  constructor() {
    super(284);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100002;

  override readonly rerollWeight = 100;
}

class Skill285 extends BaseSkill {
  constructor() {
    super(285);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000093;

  override readonly rerollWeight = 0;
}

class Skill286 extends BaseSkill {
  constructor() {
    super(286);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000041;

  override readonly rerollWeight = 0;
}

class Skill287 extends BaseSkill {
  constructor() {
    super(287);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000040;

  override readonly rerollWeight = 0;
}

class Skill288 extends BaseSkill {
  constructor() {
    super(288);
  }

  override readonly text = 'min dmg = max dmg';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000083;

  override readonly rerollWeight = 0;
}

class Skill289 extends BaseSkill {
  constructor() {
    super(289);
  }

  override readonly text = 'no more common skills';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000103;

  override readonly rerollWeight = 0;
}

class Skill290 extends BaseSkill {
  constructor() {
    super(290);
  }

  override readonly text = 'dodge twice heals';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000102;

  override readonly rerollWeight = 0;
}

class Skill291 extends BaseSkill {
  constructor() {
    super(291);
  }

  override readonly text = '+1 max dmg per skill';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000099;

  override readonly rerollWeight = 0;
}

class Skill292 extends BaseSkill {
  constructor() {
    super(292);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000098;

  override readonly rerollWeight = 0;
}

class Skill293 extends BaseSkill {
  constructor() {
    super(293);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000064;

  override readonly rerollWeight = 0;
}

class Skill294 extends BaseSkill {
  constructor() {
    super(294);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['reroll'] as const;

  override readonly pickWeight = 100001;

  override readonly rerollWeight = 100;
}

class Skill295 extends BaseSkill {
  constructor() {
    super(295);
  }

  override readonly text = 'healing repairs armor';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000092;

  override readonly rerollWeight = 0;
}

class Skill296 extends BaseSkill {
  constructor() {
    super(296);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000063;

  override readonly rerollWeight = 0;
}

class Skill297 extends BaseSkill {
  constructor() {
    super(297);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000062;

  override readonly rerollWeight = 0;
}

class Skill298 extends BaseSkill {
  constructor() {
    super(298);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000061;

  override readonly rerollWeight = 0;
}

class Skill299 extends BaseSkill {
  constructor() {
    super(299);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000060;

  override readonly rerollWeight = 0;
}

class Skill300 extends BaseSkill {
  constructor() {
    super(300);
  }

  override readonly text = 'TODO: Add skill description.';

  override readonly tags = ['pick'] as const;

  override readonly pickWeight = 1000059;

  override readonly rerollWeight = 0;
}

const skills = [
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
