import { INGREDIENTS } from "../config/ingredients";
import { IngredientType } from "../types/IngredientType";
import { LevelDescription } from "./LevelDescription";
import { invariant } from "./invariant";

export function getRawIngredient(
  ingredient: IngredientType,
  levelDescription: LevelDescription,
): IngredientType {
  if (ingredient === INGREDIENTS.POT) {
    return ingredient;
  }

  const uncooked =
    levelDescription
      .getCookingStation()
      .getInvertedTransitions()
      .get(ingredient) ?? ingredient;

  const unprepared =
    levelDescription
      .getPrepareStation()
      .getInvertedTransitions()
      .get(uncooked ?? ingredient) ??
    uncooked ??
    ingredient;

  invariant(unprepared !== ingredient, "Could not find raw ingredient");

  return unprepared;
}
