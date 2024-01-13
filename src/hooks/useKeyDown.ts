import { Keys } from "../lib/Keys";
import { useEventListener } from "./useEventListener";

export function useKeyDown(key: Keys, handler: () => void): void {
  useEventListener("keydown", (event) => {
    if (event.key === key) {
      handler();
      event.preventDefault();
    }
  });
}
