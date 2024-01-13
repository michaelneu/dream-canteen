import { RecipeCollection } from "../../../lib/FoodOrderCollection";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class AddNewRandomRecipeStateReducer extends BaseStateReducer<
  ActionType.AddNewRandomRecipe,
  NoArguments
> {
  public readonly ACTION = ActionType.AddNewRandomRecipe;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.AddNewRandomRecipe, NoArguments>,
  ): IState {
    return {
      ...state,
      orders: RecipeCollection.fromAddNewRandomRecipe(
        state.orders,
        state.levelDescription,
      ),
    };
  }
}
