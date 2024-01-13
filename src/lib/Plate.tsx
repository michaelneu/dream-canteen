import { ReactNode } from "react";
import { Group } from "../components/primitives/Group";
import { BlockSizedSprite } from "../components/sprites/BlockSizedSprite";
import { ICarryableItem } from "../types/ICarryableItem";
import { IRenderable } from "../types/IRenderable";
import { ImageAsset } from "../config/ImageAsset";
import { Food } from "./Food";
import { areSetsEqual } from "./areSetsEqual";
import { first } from "./first";
import { invariant } from "./invariant";
import { LevelDescription } from "./LevelDescription";

export class Plate implements ICarryableItem, IRenderable {
  private readonly contents: readonly Food[];

  constructor(contents: readonly Food[]) {
    this.contents = contents;
    invariant(
      this.contents.length <= 4,
      "Plates cannot hold more than 4 items",
    );
  }

  getContents(): readonly Food[] {
    return this.contents;
  }

  render(levelDescription: LevelDescription): ReactNode {
    return this.renderAt(levelDescription, 0, 0);
  }

  renderAt(
    levelDescription: LevelDescription,
    x: number,
    y: number,
  ): React.ReactNode {
    const contents = this.getContents();
    let item = first(contents);

    if (contents.length > 1) {
      const ingredients = new Set(contents.map((item) => item.getIngredient()));
      const recipe = levelDescription
        .getRecipes()
        .find((recipe) => areSetsEqual(ingredients, recipe.ingredients));

      if (recipe != null) {
        item = new Food(recipe.result);
      }
    }

    return (
      <Group x={x} y={y}>
        <BlockSizedSprite x={0} y={0} url={ImageAsset.Plate} />
        {item?.renderAt(levelDescription, 0, 0)}
      </Group>
    );
  }
}
