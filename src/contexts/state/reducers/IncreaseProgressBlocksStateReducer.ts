import { LevelMap } from "../../../lib/LevelMap";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class IncreaseProgressBlocksStateReducer extends BaseStateReducer<
  ActionType.IncreaseProgressBlocks,
  NoArguments
> {
  public readonly ACTION = ActionType.IncreaseProgressBlocks;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.IncreaseProgressBlocks, NoArguments>,
  ): IState {
    return {
      ...state,
      levelMap: LevelMap.fromIncreaseProgressBlocks(
        state.levelMap,
        state.player.activeBlockID,
        state.levelDescription,
      ),
    };
  }
}
