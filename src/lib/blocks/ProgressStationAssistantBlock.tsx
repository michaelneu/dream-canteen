import { ReactNode } from "react";
import { ICarryableItem } from "../../types/ICarryableItem";
import { LevelDescription } from "../LevelDescription";
import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { ImageAsset } from "../../config/ImageAsset";
import { Nullable } from "../../types/Nullable";
import { BaseBlockWithStorage } from "./BaseBlockWithStorage";

export class ProgressStationAssistantBlock
  extends BaseBlockWithStorage
  implements ICarryableItem
{
  renderAt(
    _levelDescription: LevelDescription,
    x: number,
    y: number,
  ): ReactNode {
    return (
      <CounterBasedBlockSizedSprite
        key={this.getID()}
        block={this}
        x={x}
        y={y}
        counterWithCounterBelowURL={ImageAsset.Counter}
        standaloneCounterURL={ImageAsset.CounterStandalone}
      />
    );
  }

  render(levelDescription: LevelDescription): React.ReactNode {
    return this.renderAt(
      levelDescription,
      this.getBoundingBox().getTopLeftX(),
      this.getBoundingBox().getTopLeftY(),
    );
  }

  cloneWithReplacedContent(
    storage: Nullable<ICarryableItem>,
  ): ProgressStationAssistantBlock {
    return new ProgressStationAssistantBlock(this.getBoundingBox(), storage);
  }

  static getStringRepresentationForParsing(): string {
    return "A";
  }
}
