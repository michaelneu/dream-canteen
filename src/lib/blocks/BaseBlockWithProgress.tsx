import { ICarryableItem } from "../../types/ICarryableItem";
import { Nullable } from "../../types/Nullable";
import { BoundingBox } from "../BoundingBox";
import { LevelDescription } from "../LevelDescription";
import { BaseBlockWithStorage } from "./BaseBlockWithStorage";

export abstract class BaseBlockWithProgress extends BaseBlockWithStorage {
  private readonly progress: number;

  constructor(
    boundingBox: BoundingBox,
    storage: Nullable<ICarryableItem> = null,
    progress: number = 0,
  ) {
    super(boundingBox, storage);
    this.progress = progress;
  }

  getProgress(): number {
    return this.progress;
  }

  abstract getNeedsToBeActivated(): boolean;
  abstract cloneWithIncreasedProgress(
    levelDescription: LevelDescription,
  ): BaseBlockWithProgress;
}
