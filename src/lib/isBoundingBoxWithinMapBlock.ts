import { ICoordinate } from "../types/ICoordinate";
import { BoundingBox } from "./BoundingBox";
import { LevelMap } from "./LevelMap";
import { getBlockContainingCoordinates } from "./getBlockContainingCoordinates";

export function isBoundingBoxWithinMapBlock(
  boundingBox: BoundingBox,
  levelMap: LevelMap,
): boolean {
  const points: readonly ICoordinate[] = [
    {
      x: boundingBox.getTopLeftX(),
      y: boundingBox.getTopLeftY(),
    },
    {
      x: boundingBox.getCenterX(),
      y: boundingBox.getTopLeftY(),
    },
    {
      x: boundingBox.getBottomRightX(),
      y: boundingBox.getTopLeftY(),
    },
    {
      x: boundingBox.getBottomRightX(),
      y: boundingBox.getCenterY(),
    },
    {
      x: boundingBox.getBottomRightX(),
      y: boundingBox.getBottomRightY(),
    },
    {
      x: boundingBox.getCenterX(),
      y: boundingBox.getBottomRightY(),
    },
    {
      x: boundingBox.getTopLeftX(),
      y: boundingBox.getBottomRightY(),
    },
    {
      x: boundingBox.getTopLeftX(),
      y: boundingBox.getCenterY(),
    },
    {
      x: boundingBox.getCenterX(),
      y: boundingBox.getCenterY(),
    },
  ];

  const blocks = levelMap.getAllNonFreeBlocks();

  for (const { x, y } of points) {
    const block = getBlockContainingCoordinates(x, y, blocks);

    if (block != null) {
      return true;
    }
  }

  return false;
}
