import { LevelMap } from "../../../../lib/LevelMap";
import { Plate } from "../../../../lib/Plate";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutPlateOnCounterPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutPlateOnCounter> {
  public readonly ACTION = ActionType.PutPlateOnCounter;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Plate &&
      state.derived?.player.lookedAtBlock instanceof CounterBlock &&
      state.derived.player.lookedAtBlock.getIsEmpty()
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutPlateOnCounter, NoArguments>,
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
