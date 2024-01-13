import { Keys } from "../lib/Keys";
import { noop } from "../lib/noop";
import { useGameStateContext } from "../contexts/GameStateContext";
import { useKeyDown } from "./useKeyDown";

export function useKeyDownWhileGameIsRunning(
  key: Keys,
  handler: () => void,
): void {
  const {
    state: {
      derived: { isGameRunning },
    },
  } = useGameStateContext();

  useKeyDown(key, isGameRunning ? handler : noop);
}
