import { GroupWithProgressBar } from "../../components/GroupWithProgressBar";
import { Smoke } from "../../components/sprites/Smoke";
import { CounterBasedBlockSizedSprite } from "../../components/sprites/CounterBasedBlockSizedSprite";
import { BLOCK_SIZE, COOKING_STATION_PROGRESS_CHANGE } from "../../config";
import { ImageAsset } from "../../config/ImageAsset";
import { ICarryableItem } from "../../types/ICarryableItem";
import { Nullable } from "../../types/Nullable";
import { Food } from "../Food";
import { LevelDescription } from "../LevelDescription";
import { Pot } from "../Pot";
import { areSetsEqual } from "../areSetsEqual";
import { IngredientType } from "../../config/ingredients";
import { BaseBlockWithProgress } from "./BaseBlockWithProgress";

export class CookingStationBlock extends BaseBlockWithProgress {
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
          counterWithCounterBelowURL={ImageAsset.CookingStation}
          standaloneCounterURL={ImageAsset.CookingStationStandalone}
          storage={this.getStorage()}
        />

        {this.getProgress() > 0 ? <Smoke x={0} y={-BLOCK_SIZE / 4} /> : null}
      </GroupWithProgressBar>
    );
  }

  getNeedsToBeActivated(): boolean {
    return false;
  }

  cloneWithIncreasedProgress(
    levelDescription: LevelDescription,
  ): BaseBlockWithProgress {
    if (this.getIsEmpty()) {
      return this;
    }

    const storage = this.getStorage();
    const nextProgress =
      storage instanceof Pot && storage.getIsEmpty()
        ? this.getProgress()
        : this.getProgress() + COOKING_STATION_PROGRESS_CHANGE;

    return new CookingStationBlock(
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

    if (nextProgress < 100) {
      return storage;
    }

    if (storage instanceof Food) {
      if (
        nextProgress >= 200 &&
        storage.getIngredient() !== IngredientType.BurnedContents
      ) {
        return new Food(IngredientType.BurnedContents);
      }

      const cookedIngredient = levelDescription
        .getCookingStation()
        .getTransitions()
        .get(storage.getIngredient());

      if (cookedIngredient != null) {
        return new Food(cookedIngredient);
      }
    }

    if (storage instanceof Pot) {
      if (nextProgress >= 200) {
        return new Food(IngredientType.BurnedContents);
      }

      const potIngredients = new Set(
        storage.getContents().map((food) => food.getIngredient()),
      );

      potIngredients.add(IngredientType.Pot);

      const recipe = levelDescription
        .getRecipes()
        .find((recipe) => areSetsEqual(recipe.ingredients, potIngredients));

      if (recipe != null) {
        return new Food(recipe.result);
      }
    }

    return storage;
  }

  cloneWithReplacedContent(
    storage: Nullable<ICarryableItem>,
  ): CookingStationBlock {
    return new CookingStationBlock(this.getBoundingBox(), storage, 0);
  }

  static getStringRepresentationForParsing(): string {
    return "3";
  }
}
