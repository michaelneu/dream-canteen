import { Food } from "../../../../lib/Food";
import { PrepareStationBlock } from "../../../../lib/blocks/PrepareStationBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class StartPrepareStationPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.StartPrepareStation> {
  public readonly ACTION = ActionType.StartPrepareStation;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    if (!(state.derived?.player.lookedAtBlock instanceof PrepareStationBlock)) {
      return false;
    }

    const storage = state.derived.player.lookedAtBlock.getStorage();

    if (!(storage instanceof Food)) {
      return false;
    }

    return state.levelDescription
      .getPrepareStation()
      .getTransitions()
      .has(storage.getIngredient());
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.StartPrepareStation, null>,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof PrepareStationBlock,
      "Unexpected block type",
    );

    return {
      ...state,
      player: {
        ...state.player,
        activeBlockID: state.derived.player.lookedAtBlock.getID(),
      },
    };
  }
}
