import { exhaustiveSwitchCase } from "../lib/exhaustiveSwitchCase";
import { ImageAsset } from "./ImageAsset";

export enum IngredientType {
  Blueberry,
  BlueberryJelly,
  BurnedContents,
  CutBlueberry,
  CutStrawberry,
  Egg,
  EggCooked,
  EggFriedRice,
  Jelly,
  Pot,
  Rice,
  RiceCooked,
  Strawberry,
  StrawberryJelly,
}

export function getIngredientAssets(ingredient: IngredientType): ImageAsset[] {
  switch (ingredient) {
    case IngredientType.Blueberry:
      return [ImageAsset.Blueberry];

    case IngredientType.BlueberryJelly:
      return [ImageAsset.BlueberryJelly];

    case IngredientType.BurnedContents:
      return [ImageAsset.BurnedContents];

    case IngredientType.CutBlueberry:
      return [ImageAsset.CutBlueberry];

    case IngredientType.CutStrawberry:
      return [ImageAsset.CutStrawberry];

    case IngredientType.Egg:
      return [ImageAsset.Egg];

    case IngredientType.EggCooked:
      return [ImageAsset.EggCooked];

    case IngredientType.EggFriedRice:
      return [ImageAsset.EggFriedRice];

    case IngredientType.Jelly:
      return [ImageAsset.Jelly];

    case IngredientType.Pot:
      return [ImageAsset.Pot];

    case IngredientType.Rice:
      return [ImageAsset.Rice];

    case IngredientType.RiceCooked:
      return [ImageAsset.RiceCooked];

    case IngredientType.Strawberry:
      return [ImageAsset.Strawberry1, ImageAsset.Strawberry2];

    case IngredientType.StrawberryJelly:
      return [ImageAsset.StrawberryJelly];

    default:
      throw exhaustiveSwitchCase(ingredient);
  }
}
