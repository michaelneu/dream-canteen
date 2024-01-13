import { LevelMap } from "../../../../lib/LevelMap";
import { CookingStationBlock } from "../../../../lib/blocks/CookingStationBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpFoodFromCookingStationPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpFoodFromCookingStation> {
  public readonly ACTION = ActionType.PickUpFoodFromCookingStation;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem == null &&
      state.derived?.player.lookedAtBlock instanceof CookingStationBlock &&
      !state.derived.player.lookedAtBlock.getIsEmpty() &&
      state.derived.player.lookedAtBlock.getProgress() >= 100
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PickUpFoodFromCookingStation, null>,
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
          null,
          0,
        ),
      ),
      player: {
        ...state.player,
        carriedItem: state.derived.player.lookedAtBlock.getStorage(),
      },
    };
  }
}
