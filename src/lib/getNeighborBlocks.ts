import compactArray from "fbjs/lib/compactArray";
import { BLOCK_SIZE } from "../config";
import { ICoordinate } from "../types/ICoordinate";
import { BaseBlock } from "./blocks/BaseBlock";
import { getBlockContainingCoordinates } from "./getBlockContainingCoordinates";

export function getNeighborBlocks(
  block: BaseBlock,
  blocks: readonly BaseBlock[],
): BaseBlock[] {
  const points: readonly ICoordinate[] = [
    {
      x: block.getBoundingBox().getCenterX(),
      y: block.getBoundingBox().getCenterY() - BLOCK_SIZE,
    },
    {
      x: block.getBoundingBox().getCenterX(),
      y: block.getBoundingBox().getCenterY() + BLOCK_SIZE,
    },
    {
      x: block.getBoundingBox().getCenterX() - BLOCK_SIZE,
      y: block.getBoundingBox().getCenterY(),
    },
    {
      x: block.getBoundingBox().getCenterX() + BLOCK_SIZE,
      y: block.getBoundingBox().getCenterY(),
    },
  ];

  return compactArray(
    points.map(({ x, y }) => getBlockContainingCoordinates(x, y, blocks)),
  );
}
