import { BLOCK_SIZE } from "../config";
import { Nullable } from "../types/Nullable";
import { BaseBlock } from "./blocks/BaseBlock";
import { FreeBlock } from "./blocks/FreeBlock";

export function collisionYAxis(
  nextY: number,
  isMovingUpwards: boolean,
  collidingBlock: Nullable<BaseBlock>,
): number {
  if (collidingBlock == null || collidingBlock instanceof FreeBlock) {
    return nextY;
  }

  const boundingBox = collidingBlock.getBoundingBox();

  if (isMovingUpwards) {
    return boundingBox.getBottomRightY();
  }

  return boundingBox.getTopLeftY() - BLOCK_SIZE;
}

export function collisionXAxis(
  nextX: number,
  isMovingLeft: boolean,
  collidingBlock: Nullable<BaseBlock>,
): number {
  if (collidingBlock == null || collidingBlock instanceof FreeBlock) {
    return nextX;
  }

  const boundingBox = collidingBlock.getBoundingBox();

  if (isMovingLeft) {
    return boundingBox.getBottomRightX();
  }

  return boundingBox.getTopLeftX() - BLOCK_SIZE;
}
