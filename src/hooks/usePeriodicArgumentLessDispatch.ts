import {
  ArgumentLessAction,
  useGameStateContext,
} from "../contexts/GameStateContext";
import { ActionType } from "../contexts/state/ActionType";
import { TimeNumber } from "../types/Numbers";
import { INTERVAL_DISABLED } from "./useInterval";
import { useIntervalDuringGame } from "./useIntervalDuringGame";

export function usePeriodicArgumentLessDispatch<TAction extends ActionType>(
  actions: readonly ArgumentLessAction<TAction>[],
  interval: TimeNumber,
) {
  const { dispatch } = useGameStateContext();
  useIntervalDuringGame(
    () => {
      for (const action of actions) {
        dispatch({
          type: action,
        } as any);
      }
    },
    actions.length > 0 ? interval : INTERVAL_DISABLED,
  );
}
