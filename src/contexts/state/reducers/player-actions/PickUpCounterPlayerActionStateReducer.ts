import { LevelMap } from "../../../../lib/LevelMap";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { FreeBlock } from "../../../../lib/blocks/FreeBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpCounterPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpCounter> {
  public readonly ACTION = ActionType.PickUpCounter;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.derived?.player.lookedAtBlock instanceof CounterBlock &&
      state.derived.player.lookedAtBlock.getIsEmpty() &&
      state.player.carriedItem == null
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PickUpCounter, null>,
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
        new FreeBlock(state.derived.player.lookedAtBlock.getBoundingBox()),
      ),
      player: {
        ...state.player,
        carriedItem: state.derived.player.lookedAtBlock,
      },
    };
  }
}
