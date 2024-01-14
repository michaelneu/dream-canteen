import { IngredientType } from "../config/ingredients";

export interface IRecipe {
  readonly label: string;
  readonly ingredients: ReadonlySet<IngredientType>;
  readonly result: IngredientType;
}
