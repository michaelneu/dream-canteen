import { IngredientType } from "../config/ingredients";

export type IngredientTransitions = ReadonlyMap<IngredientType, IngredientType>;
export type InvertedIngredientTransitions = ReadonlyMap<
  IngredientType,
  IngredientType
>;
