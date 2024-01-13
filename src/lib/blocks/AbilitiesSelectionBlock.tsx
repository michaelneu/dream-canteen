import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { ImageAsset } from "../../config/ImageAsset";
import { LevelDescription } from "../LevelDescription";
import { BaseBlock } from "./BaseBlock";

export class AbilitiesSelectionBlock extends BaseBlock {
  render(_levelDescription: LevelDescription): React.ReactNode {
    return (
      <CounterBasedBlockSizedSprite
        key={this.getID()}
        block={this}
        x={this.getBoundingBox().getTopLeftX()}
        y={this.getBoundingBox().getTopLeftY()}
        counterWithCounterBelowURL={ImageAsset.AbilitiesStandalone}
        standaloneCounterURL={ImageAsset.AbilitiesStandalone}
      />
    );
  }

  static getStringRepresentationForParsing(): string {
    return "5";
  }
}
