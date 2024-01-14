import React from "react";
import { ImageAsset } from "../config/ImageAsset";
import { randomBetween } from "../lib/randomBetween";
import { repeatArray } from "../lib/repeatArray";
import { Percentage } from "../types/Numbers";
import { FallingSprite } from "./sprites/FallingSprite";

const FALLING_SPRITES = repeatArray(
  [
    ImageAsset.Blueberry,
    ImageAsset.CutBlueberry,
    ImageAsset.BlueberryJelly,
    ImageAsset.EggFriedRice,
    ImageAsset.Rice,
    ImageAsset.Jelly,
    ImageAsset.Pot,
    ImageAsset.Strawberry1,
    ImageAsset.Strawberry2,
    ImageAsset.CutStrawberry,
    ImageAsset.StrawberryJelly,
  ],
  10,
).map((sprite, index) => {
  const size = randomBetween(40, 50);

  return (
    <FallingSprite
      key={index}
      x={randomBetween(-1, 1) as Percentage}
      width={size}
      height={size}
      startOffset={randomBetween(-1.5, 0)}
      speed={0.00125}
      url={sprite}
    />
  );
});

export function FallingIngredients() {
  return <>{FALLING_SPRITES}</>;
}
