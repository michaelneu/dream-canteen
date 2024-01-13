import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { ImageAsset } from "../../config/ImageAsset";
import { LevelDescription } from "../LevelDescription";
import { BaseBlock } from "./BaseBlock";

export class SuppliesBlock extends BaseBlock {
  render(_levelDescription: LevelDescription): React.ReactNode {
    return (
      <CounterBasedBlockSizedSprite
        block={this}
        key={this.getID()}
        x={this.getBoundingBox().getTopLeftX()}
        y={this.getBoundingBox().getTopLeftY()}
        counterWithCounterBelowURL={ImageAsset.Supplies}
        standaloneCounterURL={ImageAsset.SuppliesStandalone}
      />
    );
  }

  static getStringRepresentationForParsing(): string {
    return "6";
  }
}
