import { useMemo } from "react";
import { BLOCK_SIZE } from "../../config";
import { useGameStateContext } from "../../contexts/GameStateContext";
import { BaseBlock } from "../../lib/blocks/BaseBlock";
import { FreeBlock } from "../../lib/blocks/FreeBlock";
import { Nullable } from "../../types/Nullable";
import { ICarryableItem } from "../../types/ICarryableItem";
import { Group } from "../primitives/Group";
import { ImageAsset } from "../../config/ImageAsset";
import { BlockSizedSprite } from "./BlockSizedSprite";

const STORAGE_SCALE = 0.5;
const STORAGE_SIZE = BLOCK_SIZE * STORAGE_SCALE;

interface IProps {
  x: number;
  y: number;
  block: BaseBlock;
  standaloneCounterURL: ImageAsset;
  counterWithCounterBelowURL: ImageAsset;
  storage?: Nullable<ICarryableItem>;
}

export function CounterBasedBlockSizedSprite({
  x,
  y,
  block,
  standaloneCounterURL,
  counterWithCounterBelowURL,
  storage,
}: IProps) {
  const {
    state: { levelMap, levelDescription },
  } = useGameStateContext();

  const hasBlockBelow = useMemo(() => {
    const grid = levelMap.getGrid();
    const rowIndex = grid.findIndex((row) => row.includes(block));

    if (rowIndex === -1) {
      return false;
    }

    const rowIndexBelow = rowIndex + 1;

    if (rowIndexBelow >= levelMap.getRows()) {
      return false;
    }

    const row = grid[rowIndex];
    const columnIndex = row.findIndex((rowBlock) => rowBlock === block);
    const blockBelow = grid[rowIndexBelow][columnIndex];
    const isFreeBlock = blockBelow instanceof FreeBlock;

    return !isFreeBlock;
  }, [block, levelMap]);

  return (
    <>
      <BlockSizedSprite
        x={x}
        y={y}
        url={hasBlockBelow ? counterWithCounterBelowURL : standaloneCounterURL}
      />

      {storage != null ? (
        <Group
          x={x + BLOCK_SIZE / 2 - STORAGE_SIZE / 2}
          y={
            hasBlockBelow
              ? y + BLOCK_SIZE / 2 - STORAGE_SIZE / 2
              : y + BLOCK_SIZE / 5 - STORAGE_SIZE / 2
          }
          scale={STORAGE_SCALE}
        >
          {storage.renderAt(levelDescription, 0, 0)}
        </Group>
      ) : null}
    </>
  );
}
