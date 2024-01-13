import { Keys } from "../lib/Keys";
import { useEventListener } from "./useEventListener";

export function useKeyUp(key: Keys, handler: () => void): void {
  useEventListener("keyup", (event) => {
    if (event.key === key) {
      handler();
      event.preventDefault();
    }
  });
}
