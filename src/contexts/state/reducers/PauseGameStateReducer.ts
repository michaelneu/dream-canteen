import { currentTime } from "../../../lib/currentTime";
import { TimeNumber } from "../../../types/Numbers";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class PauseGameStateReducer extends BaseStateReducer<
  ActionType.PauseGame,
  NoArguments
> {
  public readonly ACTION = ActionType.PauseGame;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PauseGame, NoArguments>,
  ): IState {
    return {
      ...state,
      pause: {
        elapsedTime: (currentTime() - state.startTime) as TimeNumber,
      },
    };
  }
}
