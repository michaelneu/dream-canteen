import { FreeBlock } from "./FreeBlock";

export class PlayerSpawnBlock extends FreeBlock {
  static getStringRepresentationForParsing(): string {
    return "x";
  }
}
