import { BLOCK_SIZE } from "../config";
import { ReadOnly2DArray } from "../types/ReadOnly2DArray";
import { Nullable } from "../types/Nullable";
import { firstx } from "./firstx";
import { invariant } from "./invariant";
import { matrixHasConsistentNumberOfCells } from "./matrixHasConsistentNumberOfCells";
import { BoundingBox } from "./BoundingBox";
import { BaseBlock, BlockID } from "./blocks/BaseBlock";
import { FreeBlock } from "./blocks/FreeBlock";
import { CounterBlock } from "./blocks/CounterBlock";
import { PrepareStationBlock } from "./blocks/PrepareStationBlock";
import { CookingStationBlock } from "./blocks/CookingStationBlock";
import { SuppliesBlock } from "./blocks/SuppliesBlock";
import { TrashBlock } from "./blocks/TrashBlock";
import { CleanPlatesBlock } from "./blocks/CleanPlatesBlock";
import { PlayerSpawnBlock } from "./blocks/PlayerSpawnBlock";
import { CustomerBlock } from "./blocks/CustomerBlock";
import { BaseBlockWithProgress } from "./blocks/BaseBlockWithProgress";
import { AbilitiesSelectionBlock } from "./blocks/AbilitiesSelectionBlock";
import { getNeighborBlocks } from "./getNeighborBlocks";
import { ProgressStationAssistantBlock } from "./blocks/ProgressStationAssistantBlock";
import { LevelDescription } from "./LevelDescription";

export class LevelMap {
  private readonly grid: ReadOnly2DArray<BaseBlock>;

  private readonly allBlocksAsArray: readonly BaseBlock[];
  private readonly allNonFreeBlocksAsArray: readonly BaseBlock[];
  private readonly allFreeBlocksAsArray: readonly FreeBlock[];
  private readonly allSpawnBlocks: readonly PlayerSpawnBlock[];

  constructor(grid: ReadOnly2DArray<BaseBlock>) {
    invariant(
      matrixHasConsistentNumberOfCells(grid),
      "Should have consistent number of rows / columns",
    );

    this.grid = grid;
    this.allBlocksAsArray = this.grid.flat(1);
    this.allNonFreeBlocksAsArray = this.allBlocksAsArray.filter(
      (block) => !(block instanceof FreeBlock),
    );

    this.allFreeBlocksAsArray = this.allBlocksAsArray.filter(
      (block) => block instanceof FreeBlock,
    );

    this.allSpawnBlocks = this.allFreeBlocksAsArray.filter(
      (block) => block instanceof PlayerSpawnBlock,
    );
  }

  static fromReplaceSingleBlock(
    levelMap: LevelMap,
    blockIDToReplace: BlockID,
    replacementBlock: BaseBlock,
  ): LevelMap {
    return new LevelMap(
      levelMap
        .getGrid()
        .map((row) =>
          row.map((block) =>
            block.getID() === blockIDToReplace ? replacementBlock : block,
          ),
        ),
    );
  }

  static fromIncreaseProgressBlocks(
    levelMap: LevelMap,
    activeBlockID: Nullable<BlockID>,
    levelDescription: LevelDescription,
  ): LevelMap {
    return new LevelMap(
      levelMap.getGrid().map((row) =>
        row.map((block) => {
          if (
            block instanceof BaseBlockWithProgress &&
            !block.getIsEmpty() &&
            (!block.getNeedsToBeActivated() ||
              activeBlockID === block.getID() ||
              getNeighborBlocks(block, levelMap.getAllNonFreeBlocks()).some(
                (neighbor) => neighbor instanceof ProgressStationAssistantBlock,
              ))
          ) {
            return block.cloneWithIncreasedProgress(levelDescription);
          }

          return block;
        }),
      ),
    );
  }

  static fromSpawnNewPlate(levelMap: LevelMap): LevelMap {
    const plateBlocks = levelMap
      .getAllNonFreeBlocks()
      .filter(
        (block) =>
          block instanceof CleanPlatesBlock && block.hasSpaceToSpawnPlate(),
      );

    if (plateBlocks.length === 0) {
      return levelMap;
    }

    const blockToUpdate = firstx(plateBlocks);
    invariant(
      blockToUpdate instanceof CleanPlatesBlock,
      "Unexpected block type",
    );

    return LevelMap.fromReplaceSingleBlock(
      levelMap,
      blockToUpdate.getID(),
      blockToUpdate.cloneWithAddedPlate(),
    );
  }

  static fromStringRepresentation(map: string): LevelMap {
    const grid = map
      .trim()
      .split("\n")
      .map((line, rowIndex) =>
        Array.from(line.trim()).map((char, columnIndex) => {
          const boundingBox = new BoundingBox(
            columnIndex * BLOCK_SIZE,
            rowIndex * BLOCK_SIZE,
          );

          for (const ctor of LevelMap.getAllBlockTypes()) {
            if (ctor.getStringRepresentationForParsing() === char) {
              return new (ctor as any)(boundingBox) as BaseBlock;
            }
          }

          return new FreeBlock(boundingBox);
        }),
      );

    invariant(grid.length % 4 === 0, "Maps need to be multiples of 4 high");

    const blockConstructorNames = new Set(
      this.getAllBlockTypes().map((type) => type.name),
    );

    for (const row of grid) {
      invariant(row.length % 4 === 0, "Rows need to be multiples of 4 wide");

      for (const cell of row) {
        blockConstructorNames.delete(cell.constructor.name);
      }
    }

    invariant(
      blockConstructorNames.size === 0,
      `Missing some block types: ${Array.from(blockConstructorNames).join(
        ", ",
      )}`,
    );

    return new LevelMap(grid);
  }

  static getAllBlockTypes(): readonly (typeof BaseBlock)[] {
    const blocks = [
      AbilitiesSelectionBlock,
      CleanPlatesBlock,
      CookingStationBlock,
      CounterBlock,
      CustomerBlock,
      FreeBlock,
      PlayerSpawnBlock,
      PrepareStationBlock,
      SuppliesBlock,
      TrashBlock,
    ];

    const stringRepresentations = blocks.map((block) =>
      block.getStringRepresentationForParsing(),
    );

    invariant(
      new Set(stringRepresentations).size === stringRepresentations.length,
      "Cannot have duplicate string representations",
    );

    return blocks;
  }

  getStringRepresentation(): string {
    return this.getGrid()
      .map((row) =>
        row
          .map((block) =>
            (
              block.constructor as typeof BaseBlock
            ).getStringRepresentationForParsing(),
          )
          .join(""),
      )
      .join("\n");
  }

  getColumns(): number {
    const firstRow = firstx(this.getGrid());
    return firstRow.length;
  }

  getRows(): number {
    return this.getGrid().length;
  }

  getGrid(): ReadOnly2DArray<BaseBlock> {
    return this.grid;
  }

  getAllBlocks(): readonly BaseBlock[] {
    return this.allBlocksAsArray;
  }

  getAllNonFreeBlocks(): readonly BaseBlock[] {
    return this.allNonFreeBlocksAsArray;
  }

  getAllFreeBlocks(): readonly FreeBlock[] {
    return this.allFreeBlocksAsArray;
  }

  getSpawnBlocks(): readonly PlayerSpawnBlock[] {
    return this.allSpawnBlocks;
  }
}
