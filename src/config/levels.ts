import { LevelDescription } from "../lib/LevelDescription";
import { LevelMap } from "../lib/LevelMap";
import { IngredientType } from "./ingredients";

const MAPS = [
  `
    0000000000000000
    0113112112111310
    0200000000000020
    04000005000x0060
    0200000000000020
    0100000000000010
    0113121728111310
    0000000000000000
  `,
  `
    0000000000000000
    0111111111111110
    0100000000000010
    0104003000000010
    01000010000x0010
    0100001000000010
    0102181711200010
    0100001000000010
    0106003000005010
    0100000000000010
    0111111111111110
    0000000000000000
  `,
  `
    0000000000000000
    0111111111871110
    0100000000000010
    0104000300000010
    0100000100000010
    0100000100000010
    0102111111120010
    0100000100000010
    0106000300000510
    0100x00000000010
    0111111111111110
    0000000000000000
  `,
  `
    0000000000000000
    0111111111111110
    0100000000000010
    0100811511110010
    0100000000030010
    0100100000020010
    0100200x00010010
    0100300100000010
    0100111411170010
    0100000000000010
    0111111611111110
    0000000000000000
  `,
  `
    0000000000000000
    0112111111813110
    0100000000000010
    0100000000000010
    0100000000000010
    0400000000000050
    01000000x0000010
    0100000000000010
    0100000000000010
    0100000000000010
    0113111611172110
    0000000000000000
  `,
  `
    0000000000000000
    0000011211100000
    0000010000100000
    0000010000100000
    0113110000113110
    0800000600000070
    0100000x00000010
    0115110000114110
    0000010000100000
    0000010000100000
    0000011211100000
    0000000000000000
  `,
];

export const LEVELS: readonly LevelDescription[] = MAPS.map(
  (map, index) =>
    new LevelDescription(
      `Level.${index}`,
      LevelMap.fromStringRepresentation(map),
      new Map([[IngredientType.Blueberry, IngredientType.CutBlueberry]]),
      new Map([
        [IngredientType.Rice, IngredientType.RiceCooked],
        [IngredientType.Egg, IngredientType.EggCooked],
      ]),
      [
        IngredientType.Blueberry,
        IngredientType.Jelly,
        IngredientType.Rice,
        IngredientType.Egg,
        IngredientType.Pot,
      ],
      [
        {
          ingredients: new Set([
            IngredientType.CutBlueberry,
            IngredientType.Jelly,
          ]),
          label: "Blueberry Jelly",
          result: IngredientType.BlueberryJelly,
        },
        {
          ingredients: new Set([
            IngredientType.EggCooked,
            IngredientType.RiceCooked,
            IngredientType.Pot,
          ]),
          label: "Egg Fried Rice",
          result: IngredientType.EggFriedRice,
        },
      ],
    ),
);
