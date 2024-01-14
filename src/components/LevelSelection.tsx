import { useMemo } from "react";
import { LevelDescription, LevelDescriptionID } from "../lib/LevelDescription";
import { ImageAsset } from "../config/ImageAsset";
import { randomBetween } from "../lib/randomBetween";
import { repeatArray } from "../lib/repeatArray";
import { Percentage } from "../types/Numbers";
import { FullScreenMenu } from "./FullScreenMenu";
import { Sprite } from "./primitives/Sprite";
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

interface IProps {
  levelDesciptions: readonly LevelDescription[];
  onSelectLevel: (id: LevelDescriptionID) => void;
}

export function LevelSelection({ levelDesciptions, onSelectLevel }: IProps) {
  const options = useMemo(() => {
    return levelDesciptions.map((levelDesciption) => ({
      label: levelDesciption.getName(),
      value: levelDesciption.getID(),
    }));
  }, [levelDesciptions]);

  return (
    <FullScreenMenu
      headerHeight={200}
      header={
        <>
          {FALLING_SPRITES}

          <Sprite
            url={ImageAsset.MenuLogo}
            x={-60}
            y={-40}
            width={400}
            height={400}
          />
        </>
      }
      options={options}
      onSelectOption={onSelectLevel}
    />
  );
}
