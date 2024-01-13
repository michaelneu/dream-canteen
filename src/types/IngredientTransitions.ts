import { IngredientType } from "./IngredientType";

export type IngredientTransitions = ReadonlyMap<IngredientType, IngredientType>;
export type InvertedIngredientTransitions = ReadonlyMap<
  IngredientType,
  IngredientType
>;
