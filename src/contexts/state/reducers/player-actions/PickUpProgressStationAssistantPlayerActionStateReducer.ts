import { AbilityType } from "../../../../lib/AbilityType";
import { LevelMap } from "../../../../lib/LevelMap";
import { FreeBlock } from "../../../../lib/blocks/FreeBlock";
import { ProgressStationAssistantBlock } from "../../../../lib/blocks/ProgressStationAssistantBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpProgressStationAssistantPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpProgressStationAssistant> {
  public readonly ACTION = ActionType.PickUpProgressStationAssistant;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem == null &&
      state.player.ability.specialAbility ===
        AbilityType.ProgressStationAssistant &&
      state.derived?.player.lookedAtBlock instanceof
        ProgressStationAssistantBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PickUpProgressStationAssistant, NoArguments>,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof
        ProgressStationAssistantBlock,
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
