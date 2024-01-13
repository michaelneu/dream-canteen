import { useIsKeyPressed } from "../hooks/useIsKeyPressed";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { useMovementSprite } from "../hooks/useMovementSprite";
import { Keys } from "../lib/Keys";
import { useKeyDownWhileGameIsRunning } from "../hooks/useKeyDownWhileGameIsRunning";
import { useGameStateContext } from "../contexts/GameStateContext";
import { BLOCK_SIZE } from "../config";
import { AbilityType } from "../lib/AbilityType";
import { useKeyUp } from "../hooks/useKeyUp";
import { ActionType } from "../contexts/state/ActionType";
import { Actions } from "../contexts/state/ReducerCollection";
import { ImageAsset } from "../config/ImageAsset";
import { PlayerChoicesMenu } from "./PlayerChoicesMenu";
import { Sprite } from "./primitives/Sprite";
import { Group } from "./primitives/Group";
import { SelectionHighlight } from "./SelectionHighlight";
import { CarriedItem } from "./CarriedItem";

const SPRITE_SCALE_FACTOR = 1.1;
const SPRITES = {
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

export function Player() {
  const isDownKeyDown = useIsKeyPressed(Keys.ArrowDown);
  const isUpKeyDown = useIsKeyPressed(Keys.ArrowUp);
  const isLeftKeyDown = useIsKeyPressed(Keys.ArrowLeft);
  const isRightKeyDown = useIsKeyPressed(Keys.ArrowRight);

  const {
    dispatch,
    state: {
      player: {
        lookingDirection,
        isCurrentlyMoving,
        carriedItem,
        boundingBox,
        ability: { isAbilityActive, specialAbility },
        selectedChoicesMenu,
      },
      derived: {
        player: { availablePlayerAction, lookedAtBlock },
      },
    },
  } = useGameStateContext();

  const movement = {
    isDownKeyDown,
    isLeftKeyDown,
    isRightKeyDown,
    isUpKeyDown,
  };

  useKeyboardNavigation(movement);

  const sprite = useMovementSprite({
    isCurrentlyMoving,
    lookingDirection,
    sprites: SPRITES,
  });

  useKeyDownWhileGameIsRunning(Keys.Space, () => {
    if (availablePlayerAction == null) {
      return;
    }

    dispatch({
      type: availablePlayerAction,
    } as Actions);
  });

  useKeyDownWhileGameIsRunning(Keys.A, () => {
    dispatch({
      data: null,
      type: ActionType.ActivateAbility,
    });
  });

  useKeyUp(Keys.A, () => {
    dispatch({
      data: null,
      type: ActionType.DeactivateAbility,
    });
  });

  useKeyDownWhileGameIsRunning(Keys.Escape, () => {
    dispatch({
      data: null,
      type: ActionType.PauseGame,
    });
  });

  return (
    <>
      <Group x={boundingBox.getTopLeftX()} y={boundingBox.getTopLeftY()}>
        <Sprite
          url={sprite}
          x={0}
          y={0}
          width={BLOCK_SIZE * SPRITE_SCALE_FACTOR}
          height={BLOCK_SIZE * SPRITE_SCALE_FACTOR}
          opacity={
            specialAbility === AbilityType.NoClip && isAbilityActive ? 0.5 : 1
          }
        />

        {carriedItem != null ? (
          <CarriedItem lookingDirection={lookingDirection} item={carriedItem} />
        ) : null}
      </Group>

      {lookedAtBlock != null &&
      availablePlayerAction != null &&
      selectedChoicesMenu == null ? (
        <SelectionHighlight boundingBox={lookedAtBlock.getBoundingBox()} />
      ) : null}

      <PlayerChoicesMenu />
    </>
  );
}
