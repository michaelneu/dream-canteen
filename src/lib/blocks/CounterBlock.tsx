import { ICarryableItem } from "../../types/ICarryableItem";
import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { LevelDescription } from "../LevelDescription";
import { ImageAsset } from "../../config/ImageAsset";
import { Nullable } from "../../types/Nullable";
import { BaseBlockWithStorage } from "./BaseBlockWithStorage";

export class CounterBlock
  extends BaseBlockWithStorage
  implements ICarryableItem
{
  render(levelDescription: LevelDescription): React.ReactNode {
    return this.renderAt(
      levelDescription,
      this.getBoundingBox().getTopLeftX(),
      this.getBoundingBox().getTopLeftY(),
    );
  }

  renderAt(
    _levelDescription: LevelDescription,
    x: number,
    y: number,
  ): React.ReactNode {
    return (
      <CounterBasedBlockSizedSprite
        key={this.getID()}
        block={this}
        x={x}
        y={y}
        counterWithCounterBelowURL={ImageAsset.Counter}
        standaloneCounterURL={ImageAsset.CounterStandalone}
        storage={this.getStorage()}
      />
    );
  }

  cloneWithReplacedContent(storage: Nullable<ICarryableItem>): CounterBlock {
    return new CounterBlock(this.getBoundingBox(), storage);
  }

  static getStringRepresentationForParsing(): string {
    return "1";
  }
}
