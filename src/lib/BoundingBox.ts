import { BLOCK_SIZE } from "../config";
import { IWithID } from "../types/IWithID";
import { Opaque } from "../types/OpaqueType";

type BoundingBoxID = Opaque<string, "BoundingBoxID">;

export class BoundingBox implements IWithID<BoundingBoxID> {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getID(): BoundingBoxID {
    return `${this.getTopLeftX()}-${this.getTopLeftY()}` as BoundingBoxID;
  }

  getTopLeftX(): number {
    return this.x;
  }

  getTopLeftY(): number {
    return this.y;
  }

  getBottomRightX(): number {
    return this.x + BLOCK_SIZE;
  }

  getBottomRightY(): number {
    return this.y + BLOCK_SIZE;
  }

  getCenterX(): number {
    return this.x + BLOCK_SIZE / 2;
  }

  getCenterY(): number {
    return this.y + BLOCK_SIZE / 2;
  }
}
