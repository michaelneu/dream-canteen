import { LevelMap } from "../../../../lib/LevelMap";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpFoodFromCounterPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpFoodFromCounter> {
  public readonly ACTION = ActionType.PickUpFoodFromCounter;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem == null &&
      state.derived?.player.lookedAtBlock instanceof CounterBlock &&
      !state.derived.player.lookedAtBlock.getIsEmpty()
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PickUpFoodFromCounter, null>,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof CounterBlock,
      "Unexpected block type",
    );

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        state.derived.player.lookedAtBlock.getID(),
        new CounterBlock(
          state.derived.player.lookedAtBlock.getBoundingBox(),
          null,
        ),
      ),
      player: {
        ...state.player,
        carriedItem: state.derived.player.lookedAtBlock.getStorage(),
      },
    };
  }
}
