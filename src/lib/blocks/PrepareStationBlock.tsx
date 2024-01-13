import { GroupWithProgressBar } from "../../components/GroupWithProgressBar";
import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { PREPARE_STATION_PROGRESS_CHANGE } from "../../config";
import { ImageAsset } from "../../config/ImageAsset";
import { ICarryableItem } from "../../types/ICarryableItem";
import { Nullable } from "../../types/Nullable";
import { Food } from "../Food";
import { LevelDescription } from "../LevelDescription";
import { invariant } from "../invariant";
import { BaseBlockWithProgress } from "./BaseBlockWithProgress";

export class PrepareStationBlock extends BaseBlockWithProgress {
  render(): React.ReactNode {
    return (
      <GroupWithProgressBar
        key={this.getID()}
        x={this.getBoundingBox().getTopLeftX()}
        y={this.getBoundingBox().getTopLeftY()}
        progress={this.getProgress()}
      >
        <CounterBasedBlockSizedSprite
          block={this}
          x={0}
          y={0}
          counterWithCounterBelowURL={ImageAsset.PrepareStation}
          standaloneCounterURL={ImageAsset.PrepareStationStandalone}
          storage={this.getStorage()}
        />
      </GroupWithProgressBar>
    );
  }

  getNeedsToBeActivated(): boolean {
    return true;
  }

  cloneWithIncreasedProgress(
    levelDescription: LevelDescription,
  ): BaseBlockWithProgress {
    if (this.getProgress() >= 100 || this.getIsEmpty()) {
      return this;
    }

    const nextProgress =
      this.getProgress() < 100
        ? this.getProgress() + PREPARE_STATION_PROGRESS_CHANGE
        : 100;

    return new PrepareStationBlock(
      this.getBoundingBox(),
      this.getStorageWithIncreasedProgress(nextProgress, levelDescription),
      nextProgress,
    );
  }

  private getStorageWithIncreasedProgress(
    nextProgress: number,
    levelDescription: LevelDescription,
  ): Nullable<ICarryableItem> {
    const storage = this.getStorage();

    if (storage instanceof Food && nextProgress >= 100) {
      const preparedIngredient = levelDescription
        .getPrepareStation()
        .getTransitions()
        .get(storage.getIngredient());

      invariant(
        preparedIngredient != null,
        "Prepared into an unknown ingredient; this should not happen",
      );

      return new Food(preparedIngredient);
    }

    return storage;
  }

  cloneWithReplacedContent(
    storage: Nullable<ICarryableItem>,
  ): PrepareStationBlock {
    return new PrepareStationBlock(
      this.getBoundingBox(),
      storage,
      this.getProgress(),
    );
  }

  static getStringRepresentationForParsing(): string {
    return "2";
  }
}
