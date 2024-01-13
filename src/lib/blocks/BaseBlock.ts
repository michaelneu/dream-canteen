import { IRenderable } from "../../types/IRenderable";
import { IWithID } from "../../types/IWithID";
import { Opaque } from "../../types/OpaqueType";
import { BoundingBox } from "../BoundingBox";
import { LevelDescription } from "../LevelDescription";
import { InvariantViolationException } from "../invariant";

export type BlockID = Opaque<string, "BlockID">;

export abstract class BaseBlock implements IWithID<BlockID>, IRenderable {
  private readonly boundingBox: BoundingBox;

  constructor(boundingBox: BoundingBox) {
    this.boundingBox = boundingBox;
  }

  getID(): BlockID {
    return `${
      this.constructor.name
    }-${this.getBoundingBox().getID()}` as BlockID;
  }

  getBoundingBox(): BoundingBox {
    return this.boundingBox;
  }

  static getStringRepresentationForParsing(): string {
    throw new InvariantViolationException(
      "Cannot call this method on the base class",
    );
  }

  abstract render(levelDescription: LevelDescription): React.ReactNode;
}
