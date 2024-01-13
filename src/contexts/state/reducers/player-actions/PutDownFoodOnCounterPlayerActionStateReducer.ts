import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownFoodOnCounterPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownFoodOnCounter> {
  public readonly ACTION = ActionType.PutDownFoodOnCounter;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Food &&
      state.derived?.player.lookedAtBlock instanceof CounterBlock &&
      state.derived.player.lookedAtBlock.getIsEmpty()
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutDownFoodOnCounter, null>,
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
          state.player.carriedItem,
        ),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
