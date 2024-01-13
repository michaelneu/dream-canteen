import React from "react";
import { IRenderable } from "../types/IRenderable";
import { Group } from "../components/primitives/Group";
import { BLOCK_SIZE, MAX_RECIPES } from "../config";
import { FoodOrder } from "./FoodOrder";
import { Plate } from "./Plate";
import { areSetsEqual } from "./areSetsEqual";
import { randomSample } from "./randomSample";
import { LevelDescription } from "./LevelDescription";
import { firstx } from "./firstx";

export class RecipeCollection implements IRenderable {
  private readonly recipes: readonly FoodOrder[];

  constructor(recipes: readonly FoodOrder[]) {
    this.recipes = recipes;
  }

  static fromAddNewRandomRecipe(
    collection: RecipeCollection,
    levelDescription: LevelDescription,
  ): RecipeCollection {
    if (collection.getOrders().length === MAX_RECIPES) {
      return collection;
    }

    const recipe = randomSample(levelDescription.getRecipes());

    return new RecipeCollection([
      ...collection.getOrders(),
      new FoodOrder(recipe),
    ]);
  }

  static fromDeliverFood(
    collection: RecipeCollection,
    plate: Plate,
  ): RecipeCollection {
    const plateContents = new Set(
      plate.getContents().map((food) => food.getIngredient()),
    );

    let didFilterItem = false;
    const filteredRecipes: FoodOrder[] = [];

    for (const order of collection.getOrders()) {
      if (
        !didFilterItem &&
        (areSetsEqual(plateContents, order.getRecipe().ingredients) ||
          (plateContents.size === 1 &&
            firstx(Array.from(plateContents)) === order.getRecipe().result))
      ) {
        didFilterItem = true;
        continue;
      }

      filteredRecipes.push(order);
    }

    if (filteredRecipes.length === collection.getOrders().length) {
      return collection;
    }

    return new RecipeCollection(filteredRecipes);
  }

  getOrders(): readonly FoodOrder[] {
    return this.recipes;
  }

  render(levelDescription: LevelDescription): React.ReactNode {
    return (
      <Group x={0} y={0}>
        {this.getOrders().map((recipe, index) => (
          <Group
            key={`${recipe.getID()}-${index}`}
            x={BLOCK_SIZE * index}
            y={0}
          >
            {recipe.render(levelDescription)}
          </Group>
        ))}
      </Group>
    );
  }
}
