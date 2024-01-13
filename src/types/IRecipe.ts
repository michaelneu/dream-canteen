import { IngredientType } from "./IngredientType";

export interface IRecipe {
  readonly label: string;
  readonly ingredients: ReadonlySet<IngredientType>;
  readonly result: IngredientType;
}
