import { ICarryableItem } from "../../types/ICarryableItem";
import { Nullable } from "../../types/Nullable";
import { BoundingBox } from "../BoundingBox";
import { BaseBlock } from "./BaseBlock";

export abstract class BaseBlockWithStorage extends BaseBlock {
  private readonly storage: Nullable<ICarryableItem>;

  constructor(
    boundingBox: BoundingBox,
    storage: Nullable<ICarryableItem> = null,
  ) {
    super(boundingBox);
    this.storage = storage;
  }

  getStorage(): Nullable<ICarryableItem> {
    return this.storage;
  }

  getIsEmpty(): boolean {
    return this.getStorage() == null;
  }

  abstract cloneWithReplacedContent(
    storage: Nullable<ICarryableItem>,
  ): BaseBlockWithStorage;
}
