import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { Plate } from "../../../../lib/Plate";
import { TrashBlock } from "../../../../lib/blocks/TrashBlock";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutCarriedItemInTrashPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutCarriedItemInTrash> {
  public readonly ACTION = ActionType.PutCarriedItemInTrash;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      (state.player.carriedItem instanceof Food ||
        state.player.carriedItem instanceof Plate) &&
      state.derived?.player.lookedAtBlock instanceof TrashBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutCarriedItemInTrash, null>,
  ): IState {
    return {
      ...state,
      levelMap:
        state.player.carriedItem instanceof Plate
          ? LevelMap.fromSpawnNewPlate(state.levelMap)
          : state.levelMap,
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
