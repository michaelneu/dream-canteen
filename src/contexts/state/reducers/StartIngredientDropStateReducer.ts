import { INGREDIENTS_TO_DROP } from "../../../config";
import { IngredientType } from "../../../types/IngredientType";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer } from "../BaseStateReducer";
import { IState } from "../IState";

interface IInput {
  ingredient: IngredientType;
}

export class StartIngredientDropStateReducer extends BaseStateReducer<
  ActionType.StartIngredientDrop,
  IInput
> {
  public readonly ACTION = ActionType.StartIngredientDrop;

  reduce(
    state: IState,
    action: ActionOf<ActionType.StartIngredientDrop, IInput>,
  ): IState {
    return {
      ...state,
      ingredientsDrop: {
        ...state.ingredientsDrop,
        ingredientTypeToDrop: action.data.ingredient,
        ingredientsToDrop: INGREDIENTS_TO_DROP,
      },
      player: {
        ...state.player,
        selectedChoicesMenu: null,
      },
    };
  }
}
