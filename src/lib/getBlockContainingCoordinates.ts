import { Nullable } from "../types/Nullable";
import { BaseBlock } from "./blocks/BaseBlock";
import { isWithin } from "./isWithin";

export function getBlockContainingCoordinates(
  x: number,
  y: number,
  blocks: readonly BaseBlock[],
): Nullable<BaseBlock> {
  for (const block of blocks) {
    const boundingBox = block.getBoundingBox();

    if (
      isWithin(x, boundingBox.getTopLeftX(), boundingBox.getBottomRightX()) &&
      isWithin(y, boundingBox.getTopLeftY(), boundingBox.getBottomRightY())
    ) {
      return block;
    }
  }

  return null;
}
