import { LevelMap } from "../../../../lib/LevelMap";
import { FreeBlock } from "../../../../lib/blocks/FreeBlock";
import { ProgressStationAssistantBlock } from "../../../../lib/blocks/ProgressStationAssistantBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownProgressStationAssistantPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownProgressStationAssistant> {
  public readonly ACTION = ActionType.PutDownProgressStationAssistant;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof ProgressStationAssistantBlock &&
      state.derived?.player.lookedAtBlock instanceof FreeBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutDownProgressStationAssistant, NoArguments>,
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
        new ProgressStationAssistantBlock(
          state.derived.player.lookedAtBlock.getBoundingBox(),
        ),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
