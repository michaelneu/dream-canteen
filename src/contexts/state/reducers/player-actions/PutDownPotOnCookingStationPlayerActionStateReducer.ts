import { LevelMap } from "../../../../lib/LevelMap";
import { Pot } from "../../../../lib/Pot";
import { CookingStationBlock } from "../../../../lib/blocks/CookingStationBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownPotOnCookingStationPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownPotOnCookingStation> {
  public readonly ACTION = ActionType.PutDownPotOnCookingStation;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Pot &&
      state.derived?.player.lookedAtBlock instanceof CookingStationBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutDownPotOnCookingStation, NoArguments>,
  ): IState {
    const lookedAtBlock = state.derived.player.lookedAtBlock;
    invariant(
      lookedAtBlock instanceof CookingStationBlock,
      "Unexpected block type",
    );

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
