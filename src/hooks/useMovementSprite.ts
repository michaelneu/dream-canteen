import { firstx } from "../lib/firstx";
import { Direction } from "../lib/Direction";
import { TimeNumber } from "../types/Numbers";
import { exhaustiveSwitchCase } from "../lib/exhaustiveSwitchCase";
import { ImageAsset } from "../config/ImageAsset";
import { useGameStateContext } from "../contexts/GameStateContext";
import { AbilityType } from "../lib/AbilityType";
import { useIntervalDuringGame } from "./useIntervalDuringGame";
import { useRoundRobinArray } from "./useRoundRobinArray";
import { INTERVAL_DISABLED } from "./useInterval";

interface ISprites {
  up: readonly ImageAsset[];
  right: readonly ImageAsset[];
  down: readonly ImageAsset[];
  left: readonly ImageAsset[];
}

const REGULAR_SPRITES: ISprites = {
  down: [
    ImageAsset.PlayerMoveDown0,
    ImageAsset.PlayerMoveDown1,
    ImageAsset.PlayerMoveDown2,
  ],
  left: [
    ImageAsset.PlayerMoveLeft0,
    ImageAsset.PlayerMoveLeft1,
    ImageAsset.PlayerMoveLeft2,
  ],
  right: [
    ImageAsset.PlayerMoveRight0,
    ImageAsset.PlayerMoveRight1,
    ImageAsset.PlayerMoveRight2,
  ],
  up: [
    ImageAsset.PlayerMoveUp0,
    ImageAsset.PlayerMoveUp1,
    ImageAsset.PlayerMoveUp2,
  ],
};

const SPEED_CLOAK_SPRITES: ISprites = {
  down: [
    ImageAsset.PlayerMoveSpeedCloakDown1,
    ImageAsset.PlayerMoveSpeedCloakDown2,
  ],
  left: [
    ImageAsset.PlayerMoveSpeedCloakLeft1,
    ImageAsset.PlayerMoveSpeedCloakLeft2,
  ],
  right: [
    ImageAsset.PlayerMoveSpeedCloakRight1,
    ImageAsset.PlayerMoveSpeedCloakRight2,
  ],
  up: [ImageAsset.PlayerMoveSpeedCloakUp1, ImageAsset.PlayerMoveSpeedCloakUp2],
};

interface IInput {
  lookingDirection: Direction;
  isCurrentlyMoving: boolean;
}

export function useMovementSprite({
  lookingDirection,
  isCurrentlyMoving,
}: IInput): ImageAsset {
  const {
    state: {
      player: {
        ability: { specialAbility },
      },
    },
  } = useGameStateContext();

  const sprites =
    specialAbility === AbilityType.MoveFast
      ? SPEED_CLOAK_SPRITES
      : REGULAR_SPRITES;

  const currentSprites = getSprites(lookingDirection, sprites);
  const [sprite, nextSprite] = useRoundRobinArray(currentSprites);

  useIntervalDuringGame(
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
