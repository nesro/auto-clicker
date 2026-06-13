export const weigths = {
  alwaysPick: [
    255, // crit stuns all,
    191, // Crit stuns
    192, // Crit refils
    48, // Potions Deflect Damage for 9.5 Seconds
    157, // Potions Stuns Nearby Enemies for 10.5 Seconds
    176, // 2 crits heals
    196, // dodge stuns
    209, // 0 armor inc crit %
    211, // crit heals
    228, // dodge refils

    251, // block archers in combat
    251, // crit hits all
    289, // no more common skills
    290, // dodge twice heals

    278, // 60% chance keep potion
    281, // 20 % refill on kill
    291, // +1 max dmg per skill
    292,
    267,
    165, // halting inc dodge and crit
    182, // dodge +17.5%
    185, // double dodge ranged
    285,
    295, // healing repairs armor

    91, // Dodge is 80% if HP less than 34
    17, // crit +17.5%
    18, // melee dodge +17.5%
    56, // Critical Chance +3.5% per Hit Taken, Resets on Critical Hit
    2, // crit after dodge
    10, // +40% first attack crit chance
    96, // +55% Critical Chance on Archers
    101, // Every 8th Critical Hit Executes the Enemy

    288, // min dmg = max dmg
    8, // +30% attack speed
    129, // Ranged Dodge +17.5%
    180, // deflect after kill
    181, // deflect after level
    202,
    215,
    256,
    262,
    263,
    264,
    265,
    266,
    274,
    275,
    276,
    277,
    282,
    283,
    293,
    296,
    297,
    298,
    299,
    300,

    3, // max dmg +6
    4, // first ranged dodged
    5, // crit 55% after crit

    53, // Enemies 3rd Melee Attack Heals and Repairs Armor
    33, // Deflect Every 4th Attack
    44, // Dodging Ranged Repairs 16 Armor

    34, // Dodge has 20% Change to Explode Enemy
    36, // +25% Dodge for Next Attack After Dodging
    41, // Dodging Melee Hits Enemy Behind

    106, // Every Kill increases Ranged Dodge by 1%
    130, // dodging ranged stabs
    175,
    183,
    213,
    225,
    226,
    227,
    286,
    287,

    19, // crit dmg +1.5%
    20, // 35% crit hits random
    21, // crit has 20% chance to explode
    23, // crit has 25% change to execute
    22, // crit repairs 13 armor

    52, // Each Kill Stuns One Archer for 5.5 Seconds
    13, // min dmg +6
    16, // increase dmg every hit on enemy
    51, // Attack has 30% Change to Hit Next Enemy

    39, // Dodging Twice in a Row Heals 20 HP
    112,

    253,
    254,

    166,
    171,
    172,
    173,
    174,
    231,
    235,
    236,
    238,

    244,
    245,
    246,
    247,
    248,
    249,
    250,
    257,
    258,
    259,
    260,
    268,
    269,
    271,
    272,
    273,

    145, // reroll
  ],
  rerollIfPossible: [
    241, // triple rage

    163, // first attack after halt 3.5x dmg

    64, // Heal 6 HP for Each Arrow Fired
    87, // 35% Change for Ranged Attacks to Heal
    88, // Healing Deals 13 Thorn Damage
    66, // First Attack After Halting Heals
    67, // First Attack After Repairs Armor
    76, // Get 1 Random Rare Skill Now
    79, // Having Armor Increases Dodge by 15%
    80, // 0 Armor Increases Melee Dodge by 15%
    92, // Every Attack Deals 6 Damage to Enemy in Back
    156, // xx Damage Behind Stuns
    177,
    178,
    187,
    195,
    208,
    210,
    224,

    1, // add potion
    77, // Heal 23 HP Every Time Enemy Drops Gold
    78, // Deal 33 Damage Every Time an Enemy Drops Gold
    90, // Heal 22HP Every 4 Seconds Spent Running

    35, // Dodging Drains 7hp
    42, // Dodging Does 6 Damage to All Enemies Behind
    216,

    24, // crit 20% change inc max hp

    6, // hit next after halting
    7, // 15% hit all others
    9, // 4 attack without missing thorn dmg
    11, // +75% dmg next attack per ranged hit
    103, // Killing Enemy Behind Heals 25HP
    104, // Killing deals 17 Thorn Damage to Random

    57, // Every 3rd Critical Hit Does +350% Damage
    26, // Critical Kills Always Give Rage Bonus
    27, // Critical Kills Drains HP from Random
    29, // Critical Kills Increase Max HP by 18

    102, // Instant Level Up at Camp
    75, // Repairing Armor Deals Damage
    28, // Every 10th Attack Hits All In Sight
    30, // Damage to Enemies Behind Doubles
    197,
    199,
    200,
    201,
    239,
    279,
    280,

    47, // Potions Make Nearby Enemies Take +250% Damage
    62, // Potions Increase Damage by +375% for 3 Attacks
    49, // Potions Will Mark Enemy to Explode
    43, // Overhealing Deals Damage
    54, // Enemies Never Damage HP and Armor Simultaneously

    50, // Enemies have 20% Chance to be Executed On Sight
    58, // Every Fifth Attack Hits Next Enemy, Dealing 200% Damage
    12, // healing and rage fountain doubled
    14, // aid arrows
    15, // random common skill at camps
    38, // Dodging Ranged Attacks Returns Them
    46, // Damage to Enemy In Back Drains 7 HP from Random
    74, // +300 Damage every 5th Attack

    261,
    229,
    230,
    223,
    222,
    221,
    220,
    212,
    186,
    184,
    170,
    169,
    168,
    167,
    146,
    147,
    143,
    144,
    122,
    123,
    124,
    125,
    126,
    131,
    132,
    133,
    135,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    148,
    149,
    150,
    151,
    152,
    153,
    154,
    155,
    158,
    159,
    160,
    161,
    162,
    190,
    193,
    194,
    198,
    206,
    207,
    217,
    218,
    219,
    232,
    233,
    234,
    237,
    240,
    243,

    93, // Archers Behind, when Damaged, will shoot Ally (5.5x Dmg)
    93, // Archers Behind, when Damaged, will shoot All Allies (3x Dmg)
    89, // Heal Fully Now
    83, // Healing Fountains also Give Rage
    72, // Full Armor Sets Dodge to 85%
    73, // Getting Fully Healed Repairs 30 Armor
    65, // Fire 8 Air Arrows (2-29 Dmg) Now
    63, // Heal 25 HP for Killing Enemy Unstruck
    59, // If First Enemy After Halting is an Archer, Execute it
    31, // Deal 55 Damage to All Nearby Enemies Now
    32, // Deal 11 Damage to Melee Enemies On Sight
    37, // Dodge Next 12 Attacks
    84, // Fully Heal Once After Killing 10 Enemies
    60, // Explode One Random Nearby Enemy Now
    105, // Killing an Enemy Behind Fires 3 Air Arrows 2-24Dmg
    40, // Failing to Dodge 8 Arrow in a Row Fully Heals
    71, // Fountains also Repair Armor
    85, // Heal 20 HP when Armor Depletes
    86, // Also Heal Equivalent to Armor at Camps
    45, // Drain 80 HP from Nearby Enemy Now
    70, // Heal Fountains Increases Max HP
    61, // Receiving an Angel of Death Doubles it
    97, // Chance for Enemy to Drop Gold +110%
    98, // Getting Common SKills Increases Max Armor by 24
    99, // +19 Max HP at Level Up
    100, // Execute 1 Random Enemy at Level Up
    55, // When Dying, Enemy Attacks Ally in Front of it For 4x Damage
    81, // Surviving with 11HP and 0 Armor Repairs All Armor
    82, // Healing on Level Up +30 HP
    69, // Fountains also Give Gold
    68, // Automatically Drink Potions at 0 HP
    95, // 70% Change for Lethal Attacks to Hit Random Enemy Instead
    107,
    108,
    109,
    110,
    111,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    127,
    128,
    134,
    179,
    188,
    189,

    242,
    203,
    204,
    205,
    214,
    270,
    284,
    294,
  ],
};
