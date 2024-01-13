import { LevelMap } from "../../../../lib/LevelMap";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { FreeBlock } from "../../../../lib/blocks/FreeBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownCounterPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownCounter> {
  public readonly ACTION = ActionType.PutDownCounter;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.derived?.player.lookedAtBlock instanceof FreeBlock &&
      state.player.carriedItem instanceof CounterBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutDownCounter, null>,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof FreeBlock,
      "Unexpected block type",
    );

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        state.derived.player.lookedAtBlock.getID(),
        new CounterBlock(state.derived.player.lookedAtBlock.getBoundingBox()),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
