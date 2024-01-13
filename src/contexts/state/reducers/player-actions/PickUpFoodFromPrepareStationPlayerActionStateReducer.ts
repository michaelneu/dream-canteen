import { LevelMap } from "../../../../lib/LevelMap";
import { PrepareStationBlock } from "../../../../lib/blocks/PrepareStationBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpFoodFromPrepareStationPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpFoodFromPrepareStation> {
  public readonly ACTION = ActionType.PickUpFoodFromPrepareStation;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem == null &&
      state.derived?.player.lookedAtBlock instanceof PrepareStationBlock &&
      !state.derived.player.lookedAtBlock.getIsEmpty() &&
      (state.derived.player.lookedAtBlock.getProgress() === 0 ||
        state.derived.player.lookedAtBlock.getProgress() >= 100)
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PickUpFoodFromPrepareStation, null>,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof PrepareStationBlock,
      "Unexpected block type",
    );

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        state.derived.player.lookedAtBlock.getID(),
        new PrepareStationBlock(
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
