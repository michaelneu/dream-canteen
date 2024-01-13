import { DroppedIngredientCollection } from "../../../lib/DroppedIngredientCollection";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class CleanUpExpiredIngredientsStateReducer extends BaseStateReducer<
  ActionType.CleanUpExpiredIngredients,
  NoArguments
> {
  public readonly ACTION = ActionType.CleanUpExpiredIngredients;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.CleanUpExpiredIngredients, NoArguments>,
  ): IState {
    return {
      ...state,
      ingredientsDrop: {
        ...state.ingredientsDrop,
        droppedIngredients:
          DroppedIngredientCollection.fromExpireDroppedIngredients(
            state.ingredientsDrop.droppedIngredients,
          ),
      },
    };
  }
}
