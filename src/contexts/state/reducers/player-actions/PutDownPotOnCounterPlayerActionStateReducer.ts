import { LevelMap } from "../../../../lib/LevelMap";
import { Pot } from "../../../../lib/Pot";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownPotOnCounterPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownPotOnCounter> {
  public readonly ACTION = ActionType.PutDownPotOnCounter;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Pot &&
      state.derived?.player.lookedAtBlock instanceof CounterBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutDownPotOnCounter, NoArguments>,
  ): IState {
    const lookedAtBlock = state.derived.player.lookedAtBlock;
    invariant(lookedAtBlock instanceof CounterBlock, "Unexpected block type");

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        lookedAtBlock.getID(),
        lookedAtBlock.cloneWithReplacedContent(state.player.carriedItem),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
