import {
  SCORE_DECREASE_WRONG_RECIPE,
  SCORE_INCREASE_CORRECT_RECIPE,
} from "../../../../config";
import { RecipeCollection } from "../../../../lib/FoodOrderCollection";
import { LevelMap } from "../../../../lib/LevelMap";
import { Plate } from "../../../../lib/Plate";
import { CustomerBlock } from "../../../../lib/blocks/CustomerBlock";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

let nextToastID = 0;

export class DeliverFoodToCustomerPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.DeliverFoodToCustomer> {
  public readonly ACTION = ActionType.DeliverFoodToCustomer;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Plate &&
      state.derived?.player.lookedAtBlock instanceof CustomerBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.DeliverFoodToCustomer, NoArguments>,
  ): IState {
    if (!(state.player.carriedItem instanceof Plate)) {
      return state;
    }

    const collectionAfterDelivery = RecipeCollection.fromDeliverFood(
      state.orders,
      state.player.carriedItem,
    );

    const wasCorrectRecipe = collectionAfterDelivery !== state.orders;
    const scoreDelta = wasCorrectRecipe
      ? SCORE_INCREASE_CORRECT_RECIPE
      : SCORE_DECREASE_WRONG_RECIPE;

    return {
      ...state,
      levelMap: LevelMap.fromSpawnNewPlate(state.levelMap),
      orders: collectionAfterDelivery,
      player: {
        ...state.player,
        carriedItem: null,
      },
      score: state.score + scoreDelta,
      scoreToast: {
        color: scoreDelta > 0 ? "lightgreen" : "#ff7777",
        key: String(nextToastID++),
        text: (scoreDelta > 0 ? "+" : "") + scoreDelta.toFixed(0),
      },
    };
  }
}
