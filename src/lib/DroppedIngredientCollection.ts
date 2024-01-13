import { ICoordinate } from "../types/ICoordinate";
import { IngredientType } from "../types/IngredientType";
import { TimeNumber } from "../types/Numbers";
import { DroppedIngredient } from "./DroppedIngredient";
import { LevelMap } from "./LevelMap";
import { ONE_SECOND } from "./Time";
import { currentTime } from "./currentTime";
import { randomSample } from "./randomSample";

export class DroppedIngredientCollection {
  private readonly droppedIngredients: readonly DroppedIngredient[];

  constructor(droppedIngredients: readonly DroppedIngredient[]) {
    this.droppedIngredients = droppedIngredients;
  }

  getDroppedIngredients(): readonly DroppedIngredient[] {
    return this.droppedIngredients;
  }

  public static fromDropNewIngredient(
    collection: DroppedIngredientCollection,
    levelMap: LevelMap,
    type: IngredientType,
  ): DroppedIngredientCollection {
    const freeBlocks = levelMap.getAllFreeBlocks();
    let randomTry = 0;
    let destinationCoordinate: ICoordinate;
    let hasAlreadyDroppedIngredientThere = false;

    do {
      const destinationBlock = randomSample(freeBlocks);
      randomTry++;

      destinationCoordinate = {
        x: destinationBlock.getBoundingBox().getCenterX(),
        y: destinationBlock.getBoundingBox().getCenterY(),
      };

      hasAlreadyDroppedIngredientThere =
        collection.getDroppedIngredients().find(
          // eslint-disable-next-line no-loop-func
          (dropped) =>
            dropped.getLocation().x === destinationCoordinate.x &&
            dropped.getLocation().y === destinationCoordinate.y,
        ) != null;

      if (!hasAlreadyDroppedIngredientThere) {
        break;
      }
    } while (randomTry < 3);

    if (hasAlreadyDroppedIngredientThere) {
      return collection;
    }

    return new DroppedIngredientCollection([
      ...collection.getDroppedIngredients(),
      new DroppedIngredient(type, destinationCoordinate),
    ]);
  }

  public static fromExpireDroppedIngredients(
    collection: DroppedIngredientCollection,
    maxAge = (5 * ONE_SECOND) as TimeNumber,
  ): DroppedIngredientCollection {
    return new DroppedIngredientCollection(
      collection
        .getDroppedIngredients()
        .filter(
          (ingredient) => currentTime() - ingredient.getCreatedTime() < maxAge,
        ),
    );
  }

  public static fromPickUpDroppedIngredient(
    collection: DroppedIngredientCollection,
    ingredientToPickUp: DroppedIngredient,
  ): DroppedIngredientCollection {
    return new DroppedIngredientCollection(
      collection
        .getDroppedIngredients()
        .filter((ingredient) => ingredient !== ingredientToPickUp),
    );
  }
}
