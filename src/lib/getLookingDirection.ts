import { Nullable } from "../types/Nullable";
import { Direction } from "./Direction";

export function getLookingDirection(
  deltaX: number,
  deltaY: number,
): Nullable<Direction> {
  if (deltaY > 0) {
    return Direction.Down;
  }

  if (deltaY < 0) {
    return Direction.Up;
  }

  if (deltaX > 0) {
    return Direction.Right;
  }

  if (deltaX < 0) {
    return Direction.Left;
  }

  return null;
}
