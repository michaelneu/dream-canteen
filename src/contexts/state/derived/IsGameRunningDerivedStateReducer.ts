import { GAME_DURATION } from "../../../config";
import { currentTime } from "../../../lib/currentTime";
import { BaseDerivedStateReducer } from "../BaseDerivedStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../IState";

export class IsGameRunningDerivedStateReducer extends BaseDerivedStateReducer {
  reduce(state: IStateWithMaybeDerivedState): IState {
    const isPaused = state.pause != null;
    const isTimeOver = currentTime() - state.startTime >= GAME_DURATION;

    return {
      ...state,
      derived: {
        ...state.derived,
        isGameRunning: !isPaused && !isTimeOver,
      },
    } as IState;
  }
}
