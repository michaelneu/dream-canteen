import { DroppedIngredientCollection } from "../../../lib/DroppedIngredientCollection";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class DropIngredientStateReducer extends BaseStateReducer<
  ActionType.DropIngredient,
  NoArguments
> {
  public readonly ACTION = ActionType.DropIngredient;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.DropIngredient, NoArguments>,
  ): IState {
    if (
      state.ingredientsDrop.ingredientTypeToDrop == null ||
      state.ingredientsDrop.ingredientsToDrop === 0
    ) {
      return state;
    }

    return {
      ...state,
      ingredientsDrop: {
        ...state.ingredientsDrop,
        droppedIngredients: DroppedIngredientCollection.fromDropNewIngredient(
          state.ingredientsDrop.droppedIngredients,
          state.levelMap,
          state.ingredientsDrop.ingredientTypeToDrop,
        ),
        ingredientTypeToDrop:
          state.ingredientsDrop.ingredientsToDrop > 1
            ? state.ingredientsDrop.ingredientTypeToDrop
            : null,
        ingredientsToDrop: state.ingredientsDrop.ingredientsToDrop - 1,
      },
    };
  }
}
