import { BLOCK_SIZE } from "../../../config";
import { AbilityType } from "../../../lib/AbilityType";
import { DroppedIngredientCollection } from "../../../lib/DroppedIngredientCollection";
import { clampPositionWithMapCollisions } from "../../../lib/clampPositionWithMapCollisions";
import { distance2D } from "../../../lib/distance2D";
import { getLookingDirection } from "../../../lib/getLookingDirection";
import { isBoundingBoxWithinMapBlock } from "../../../lib/isBoundingBoxWithinMapBlock";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer } from "../BaseStateReducer";
import { IState } from "../IState";

interface IInput {
  deltaX: number;
  deltaY: number;
}

export class MovePlayerStateReducer extends BaseStateReducer<
  ActionType.MovePlayer,
  IInput
> {
  public readonly ACTION = ActionType.MovePlayer;

  reduce(
    state: IState,
    action: ActionOf<ActionType.MovePlayer, IInput>,
  ): IState {
    if (state.player.selectedChoicesMenu != null) {
      return {
        ...state,
        player: {
          ...state.player,
          isCurrentlyMoving: false,
        },
      };
    }

    const isCurrentlyMoving =
      action.data.deltaX !== 0 || action.data.deltaY !== 0;

    if (
      !isCurrentlyMoving &&
      isCurrentlyMoving === state.player.isCurrentlyMoving
    ) {
      return state;
    }

    let updatedState: IState = {
      ...state,
      player: {
        ...state.player,
        activeBlockID: isCurrentlyMoving ? null : state.player.activeBlockID,
        boundingBox: clampPositionWithMapCollisions(
          state.player.boundingBox,
          action.data.deltaX,
          action.data.deltaY,
          state.levelMap,
          state.player.ability.isAbilityActive
            ? state.player.ability.specialAbility
            : null,
        ),
        isCurrentlyMoving,
        lookingDirection:
          getLookingDirection(action.data.deltaX, action.data.deltaY) ??
          state.player.lookingDirection,
      },
    };

    if (
      updatedState.player.ability.specialAbility === AbilityType.NoClip &&
      updatedState.player.ability.shouldDeactivateAbilityOnUnstuck
    ) {
      const isStuck = isBoundingBoxWithinMapBlock(
        updatedState.player.boundingBox,
        updatedState.levelMap,
      );

      if (!isStuck) {
        updatedState = {
          ...updatedState,
          player: {
            ...updatedState.player,
            ability: {
              ...updatedState.player.ability,
              isAbilityActive: false,
              shouldDeactivateAbilityOnUnstuck: false,
            },
          },
        };
      }
    }

    if (
      updatedState.player.carriedItem == null &&
      updatedState.ingredientsDrop.droppedIngredients.getDroppedIngredients()
        .length > 0
    ) {
      const ingredientToPickUp = updatedState.ingredientsDrop.droppedIngredients
        .getDroppedIngredients()
        .find((ingredient) => {
          const distanceToIngredient = distance2D(
            ingredient.getLocation().x,
            ingredient.getLocation().y,
            updatedState.player.boundingBox.getCenterX(),
            updatedState.player.boundingBox.getCenterY(),
          );

          return distanceToIngredient < BLOCK_SIZE / 2;
        });

      if (ingredientToPickUp != null) {
        updatedState = {
          ...updatedState,
          ingredientsDrop: {
            ...updatedState.ingredientsDrop,
            droppedIngredients:
              DroppedIngredientCollection.fromPickUpDroppedIngredient(
                updatedState.ingredientsDrop.droppedIngredients,
                ingredientToPickUp,
              ),
          },
          player: {
            ...updatedState.player,
            carriedItem: ingredientToPickUp.toPickedUpItem(),
          },
        };
      }
    }

    return updatedState;
  }
}
