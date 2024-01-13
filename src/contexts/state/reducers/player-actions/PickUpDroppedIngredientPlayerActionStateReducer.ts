import { DroppedIngredientCollection } from "../../../../lib/DroppedIngredientCollection";
import { FreeBlock } from "../../../../lib/blocks/FreeBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpDroppedIngredientPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpDroppedIngredient> {
  public readonly ACTION = ActionType.PickUpDroppedIngredient;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    const lookedAtBlock = state.derived?.player.lookedAtBlock;

    return (
      state.player.carriedItem == null &&
      lookedAtBlock instanceof FreeBlock &&
      state.ingredientsDrop.droppedIngredients
        .getDroppedIngredients()
        .find(
          (ingredient) =>
            ingredient.getLocation().x ===
              lookedAtBlock.getBoundingBox().getCenterX() &&
            ingredient.getLocation().y ===
              lookedAtBlock.getBoundingBox().getCenterY(),
        ) != null
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PickUpDroppedIngredient, NoArguments>,
  ): IState {
    const lookedAtBlock = state.derived.player.lookedAtBlock;

    invariant(lookedAtBlock instanceof FreeBlock, "Unexpected block type");

    const ingredient = state.ingredientsDrop.droppedIngredients
      .getDroppedIngredients()
      .find(
        (ingredient) =>
          ingredient.getLocation().x ===
            lookedAtBlock.getBoundingBox().getCenterX() &&
          ingredient.getLocation().y ===
            lookedAtBlock.getBoundingBox().getCenterY(),
      );

    if (ingredient == null) {
      return state;
    }

    return {
      ...state,
      ingredientsDrop: {
        ...state.ingredientsDrop,
        droppedIngredients:
          DroppedIngredientCollection.fromPickUpDroppedIngredient(
            state.ingredientsDrop.droppedIngredients,
            ingredient,
          ),
      },
      player: {
        ...state.player,
        carriedItem: ingredient.toPickedUpItem(),
      },
    };
  }
}
