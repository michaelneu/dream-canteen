import { TimeNumber } from "../types/Numbers";
import { useGameStateContext } from "../contexts/GameStateContext";
import { INTERVAL_DISABLED, useInterval } from "./useInterval";

export function useIntervalDuringGame(fn: () => void, ms: TimeNumber): void {
  const {
    state: {
      derived: { isGameRunning },
    },
  } = useGameStateContext();

  useInterval(fn, isGameRunning ? ms : INTERVAL_DISABLED);
}
