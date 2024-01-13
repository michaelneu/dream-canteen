import clamp from "fbjs/lib/clamp";
import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { ImageAsset } from "../../config/ImageAsset";
import { BoundingBox } from "../BoundingBox";
import { LevelDescription } from "../LevelDescription";
import { invariant } from "../invariant";
import { BaseBlock } from "./BaseBlock";

const STANDALONE_PLATE_STATION_ASSETS = [
  ImageAsset.PlateStationStandalone0,
  ImageAsset.PlateStationStandalone1,
  ImageAsset.PlateStationStandalone2,
  ImageAsset.PlateStationStandalone3,
  ImageAsset.PlateStationStandalone4,
  ImageAsset.PlateStationStandalone5,
  ImageAsset.PlateStationStandalone6,
];

const MAX_PLATE_COUNT = STANDALONE_PLATE_STATION_ASSETS.length - 1;

export class CleanPlatesBlock extends BaseBlock {
  private availablePlates: number;

  constructor(
    boundingBox: BoundingBox,
    availablePlates: number = MAX_PLATE_COUNT,
  ) {
    super(boundingBox);
    this.availablePlates = clamp(availablePlates, 0, MAX_PLATE_COUNT);
  }

  getAvailablePlates(): number {
    return this.availablePlates;
  }

  hasSpaceToSpawnPlate(): boolean {
    return this.getAvailablePlates() !== MAX_PLATE_COUNT;
  }

  cloneWithAddedPlate(): CleanPlatesBlock {
    if (!this.hasSpaceToSpawnPlate()) {
      return this;
    }

    return new CleanPlatesBlock(
      this.getBoundingBox(),
      this.getAvailablePlates() + 1,
    );
  }

  cloneWithRemovedPlate(): CleanPlatesBlock {
    invariant(this.getAvailablePlates() > 0, "Taking non-existing plates");

    return new CleanPlatesBlock(
      this.getBoundingBox(),
      this.getAvailablePlates() - 1,
    );
  }

  render(_levelDescription: LevelDescription): React.ReactNode {
    const standaloneAsset =
      STANDALONE_PLATE_STATION_ASSETS[this.getAvailablePlates()];

    invariant(standaloneAsset != null, "No asset found for plate count");

    return (
      <CounterBasedBlockSizedSprite
        key={this.getID()}
        block={this}
        x={this.getBoundingBox().getTopLeftX()}
        y={this.getBoundingBox().getTopLeftY()}
        counterWithCounterBelowURL={
          this.getAvailablePlates() === 0
            ? ImageAsset.PlateStationEmpty
            : ImageAsset.PlateStationFull
        }
        standaloneCounterURL={standaloneAsset}
      />
    );
  }

  static getStringRepresentationForParsing(): string {
    return "8";
  }
}
