import clamp from "fbjs/lib/clamp";
import { BLOCK_SIZE, MOVEMENT_SPEED } from "../config";
import { Nullable } from "../types/Nullable";
import { AbilityType } from "./AbilityType";
import { LevelMap } from "./LevelMap";
import { collisionXAxis, collisionYAxis } from "./collision";
import { getBlockContainingCoordinates } from "./getBlockContainingCoordinates";
import { BoundingBox } from "./BoundingBox";

export function clampPositionWithMapCollisions(
  playerPosition: BoundingBox,
  deltaX: number,
  deltaY: number,
  levelMap: LevelMap,
  specialAbility: Nullable<AbilityType>,
): BoundingBox {
  if (deltaX === 0 && deltaY === 0) {
    return playerPosition;
  }

  const movementSpeed =
    specialAbility === AbilityType.MoveFast
      ? MOVEMENT_SPEED * 2
      : MOVEMENT_SPEED;

  deltaX *= movementSpeed;
  deltaY *= movementSpeed;

  let nextX = clamp(
    playerPosition.getTopLeftX() + deltaX,
    0,
    (levelMap.getColumns() - 1) * BLOCK_SIZE,
  );

  let nextY = clamp(
    playerPosition.getTopLeftY() + deltaY,
    0,
    (levelMap.getRows() - 1) * BLOCK_SIZE,
  );

  if (
    nextX === playerPosition.getTopLeftX() &&
    nextY === playerPosition.getTopLeftY()
  ) {
    return playerPosition;
  }

  if (specialAbility === AbilityType.NoClip) {
    return new BoundingBox(nextX, nextY);
  }

  if (deltaY !== 0) {
    const isMovingUpwards = deltaY < 0;
    const possibleCollisionBlocks = [
      // top left corner
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX(),
        nextY,
        levelMap.getAllNonFreeBlocks(),
      ),
      // top right corner
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX() + BLOCK_SIZE,
        nextY,
        levelMap.getAllNonFreeBlocks(),
      ),
      // bottom right corner
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX() + BLOCK_SIZE,
        nextY + BLOCK_SIZE,
        levelMap.getAllNonFreeBlocks(),
      ),
      // bottom left corner
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX(),
        nextY + BLOCK_SIZE,
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle top
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX() + BLOCK_SIZE / 2,
        nextY,
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle right
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX() + BLOCK_SIZE,
        nextY + BLOCK_SIZE / 2,
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle bottom
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX() + BLOCK_SIZE / 2,
        nextY + BLOCK_SIZE,
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle left
      getBlockContainingCoordinates(
        playerPosition.getTopLeftX(),
        nextY + BLOCK_SIZE / 2,
        levelMap.getAllNonFreeBlocks(),
      ),
    ];

    for (const collisionBlock of possibleCollisionBlocks) {
      const newNextY = collisionYAxis(nextY, isMovingUpwards, collisionBlock);

      if (newNextY !== nextY) {
        nextY = newNextY;
        break;
      }
    }
  }

  if (deltaX !== 0) {
    const isMovingLeft = deltaX < 0;
    const possibleCollisionBlocks = [
      // top left corner
      getBlockContainingCoordinates(
        nextX,
        playerPosition.getTopLeftY(),
        levelMap.getAllNonFreeBlocks(),
      ),
      // top right corner
      getBlockContainingCoordinates(
        nextX + BLOCK_SIZE,
        playerPosition.getTopLeftY(),
        levelMap.getAllNonFreeBlocks(),
      ),
      // bottom right corner
      getBlockContainingCoordinates(
        nextX + BLOCK_SIZE,
        playerPosition.getTopLeftY() + BLOCK_SIZE,
        levelMap.getAllNonFreeBlocks(),
      ),
      // bottom left corner
      getBlockContainingCoordinates(
        nextX,
        playerPosition.getTopLeftY() + BLOCK_SIZE,
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle top
      getBlockContainingCoordinates(
        nextX + BLOCK_SIZE / 2,
        playerPosition.getTopLeftY(),
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle right
      getBlockContainingCoordinates(
        nextX + BLOCK_SIZE,
        playerPosition.getTopLeftY() + BLOCK_SIZE / 2,
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle bottom
      getBlockContainingCoordinates(
        nextX + BLOCK_SIZE / 2,
        playerPosition.getTopLeftY() + BLOCK_SIZE,
        levelMap.getAllNonFreeBlocks(),
      ),
      // middle left
      getBlockContainingCoordinates(
        nextX,
        playerPosition.getTopLeftY() + BLOCK_SIZE / 2,
        levelMap.getAllNonFreeBlocks(),
      ),
    ];

    for (const collisionBlock of possibleCollisionBlocks) {
      let newNextX = collisionXAxis(nextX, isMovingLeft, collisionBlock);

      if (newNextX !== nextX) {
        nextX = newNextX;
        break;
      }
    }
  }

  return new BoundingBox(nextX, nextY);
}
