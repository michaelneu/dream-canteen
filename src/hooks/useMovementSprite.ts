import { firstx } from "../lib/firstx";
import { Direction } from "../lib/Direction";
import { TimeNumber } from "../types/Numbers";
import { exhaustiveSwitchCase } from "../lib/exhaustiveSwitchCase";
import { ImageAsset } from "../config/ImageAsset";
import { INTERVAL_DISABLED, useInterval } from "./useInterval";
import { useRoundRobinArray } from "./useRoundRobinArray";

interface ISprites {
  up: readonly ImageAsset[];
  right: readonly ImageAsset[];
  down: readonly ImageAsset[];
  left: readonly ImageAsset[];
}

interface IInput {
  sprites: ISprites;
  lookingDirection: Direction;
  isCurrentlyMoving: boolean;
}

export function useMovementSprite({
  sprites,
  lookingDirection,
  isCurrentlyMoving,
}: IInput): ImageAsset {
  const currentSprites = getSprites(lookingDirection, sprites);
  const [sprite, nextSprite] = useRoundRobinArray(currentSprites);

  useInterval(
    () => {
      nextSprite();
    },
    isCurrentlyMoving ? (50 as TimeNumber) : INTERVAL_DISABLED,
  );

  return !isCurrentlyMoving ? firstx(currentSprites) : sprite;
}

function getSprites(
  direction: Direction,
  sprites: ISprites,
): readonly ImageAsset[] {
  switch (direction) {
    case Direction.Down:
      return sprites.down;
    case Direction.Left:
      return sprites.left;
    case Direction.Right:
      return sprites.right;
    case Direction.Up:
      return sprites.up;
    default:
      throw exhaustiveSwitchCase(direction);
  }
}
