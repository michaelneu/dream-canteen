import { IngredientType } from "../config/ingredients";
import { LevelDescription } from "./LevelDescription";

export function getRawIngredient(
  ingredient: IngredientType,
  levelDescription: LevelDescription,
): IngredientType {
  const uncooked =
    levelDescription
      .getCookingStation()
      .getInvertedTransitions()
      .get(ingredient) ?? ingredient;

  const unprepared =
    levelDescription
      .getPrepareStation()
      .getInvertedTransitions()
      .get(uncooked) ??
    uncooked ??
    ingredient;

  return unprepared;
}
