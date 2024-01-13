import { currentTime } from "../../../lib/currentTime";
import { Timestamp } from "../../../types/Numbers";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class UnpauseGameStateReducer extends BaseStateReducer<
  ActionType.UnpauseGame,
  NoArguments
> {
  public readonly ACTION = ActionType.UnpauseGame;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.UnpauseGame, NoArguments>,
  ): IState {
    return {
      ...state,
      pause: null,
      startTime:
        state.pause == null
          ? state.startTime
          : ((currentTime() - state.pause.elapsedTime) as Timestamp),
    };
  }
}
