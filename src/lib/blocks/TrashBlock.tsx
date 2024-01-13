import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { ImageAsset } from "../../config/ImageAsset";
import { LevelDescription } from "../LevelDescription";
import { BaseBlock } from "./BaseBlock";

export class TrashBlock extends BaseBlock {
  render(_levelDescription: LevelDescription): React.ReactNode {
    return (
      <CounterBasedBlockSizedSprite
        block={this}
        key={this.getID()}
        x={this.getBoundingBox().getTopLeftX()}
        y={this.getBoundingBox().getTopLeftY()}
        counterWithCounterBelowURL={ImageAsset.Trash}
        standaloneCounterURL={ImageAsset.TrashStandalone}
      />
    );
  }

  static getStringRepresentationForParsing(): string {
    return "7";
  }
}
