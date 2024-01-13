import { MAX_INGREDIENTS_PER_RECIPE } from "../config";
import { IRecipe } from "../types/IRecipe";
import { IngredientTransitions } from "../types/IngredientTransitions";
import { IngredientType } from "../types/IngredientType";
import { Opaque } from "../types/OpaqueType";
import { LevelMap } from "./LevelMap";
import { invariant } from "./invariant";
import { InteractiveStationDescription } from "./InteractiveStationDescription";

export type LevelDescriptionID = Opaque<number, "LevelDescriptionID">;
let nextID = 0;

export class LevelDescription {
  private id: LevelDescriptionID;

  private name: string;
  private levelMap: LevelMap;
  private prepareStation: InteractiveStationDescription;
  private cookingStation: InteractiveStationDescription;
  private supplyStationChoices: readonly IngredientType[];
  private recipes: readonly IRecipe[];

  constructor(
    name: string,
    levelMap: LevelMap,
    prepareStationTransitions: IngredientTransitions,
    cookingStationTransitions: IngredientTransitions,
    supplyStationChoices: readonly IngredientType[],
    recipes: readonly IRecipe[],
  ) {
    this.id = nextID as LevelDescriptionID;
    nextID++;

    this.name = name;
    this.levelMap = levelMap;
    this.prepareStation = new InteractiveStationDescription(
      prepareStationTransitions,
    );

    this.cookingStation = new InteractiveStationDescription(
      cookingStationTransitions,
    );

    this.supplyStationChoices = supplyStationChoices;
    this.recipes = recipes;

    invariant(
      this.recipes.every(
        (recipe) => recipe.ingredients.size <= MAX_INGREDIENTS_PER_RECIPE,
      ),
      "Too many ingredients for some recipes",
    );
  }

  getID(): LevelDescriptionID {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getLevelMap(): LevelMap {
    return this.levelMap;
  }

  getPrepareStation(): InteractiveStationDescription {
    return this.prepareStation;
  }

  getCookingStation(): InteractiveStationDescription {
    return this.cookingStation;
  }

  getSupplyStationChoices(): readonly IngredientType[] {
    return this.supplyStationChoices;
  }

  getRecipes(): readonly IRecipe[] {
    return this.recipes;
  }
}
