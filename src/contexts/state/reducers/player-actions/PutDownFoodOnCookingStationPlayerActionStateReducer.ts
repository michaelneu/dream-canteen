import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { CookingStationBlock } from "../../../../lib/blocks/CookingStationBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownFoodOnCookingStationPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownFoodOnCookingStation> {
  public readonly ACTION = ActionType.PutDownFoodOnCookingStation;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Food &&
      state.levelDescription
        .getCookingStation()
        .getTransitions()
        .has(state.player.carriedItem.getIngredient()) &&
      state.derived?.player.lookedAtBlock instanceof CookingStationBlock &&
      state.derived.player.lookedAtBlock.getIsEmpty()
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutDownFoodOnCookingStation, null>,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof CookingStationBlock,
      "Unexpected block type",
    );

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        state.derived.player.lookedAtBlock.getID(),
        new CookingStationBlock(
          state.derived.player.lookedAtBlock.getBoundingBox(),
          state.player.carriedItem,
          0,
        ),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
