import { IKeyboardMovement } from "../types/IKeyboardMovement";
import { useGameStateContext } from "../contexts/GameStateContext";
import { ActionType } from "../contexts/state/ActionType";
import { TimeNumber } from "../types/Numbers";
import { useInterval } from "./useInterval";

export function useKeyboardNavigation({
  isDownKeyDown,
  isLeftKeyDown,
  isRightKeyDown,
  isUpKeyDown,
}: IKeyboardMovement): void {
  const { dispatch } = useGameStateContext();

  useInterval(() => {
    let deltaX = 0;

    if (isRightKeyDown) {
      deltaX += 1;
    }

    if (isLeftKeyDown) {
      deltaX -= 1;
    }

    let deltaY = 0;

    if (isDownKeyDown) {
      deltaY += 1;
    }

    if (isUpKeyDown) {
      deltaY -= 1;
    }

    dispatch({
      data: {
        deltaX,
        deltaY,
      },
      type: ActionType.MovePlayer,
    });
  }, 10 as TimeNumber);
}
