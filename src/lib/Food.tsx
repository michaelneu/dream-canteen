import React from "react";
import { BlockSizedSprite } from "../components/sprites/BlockSizedSprite";
import { ICarryableItem } from "../types/ICarryableItem";
import { IWithID } from "../types/IWithID";
import { Opaque } from "../types/OpaqueType";
import { IngredientType, getIngredientAssets } from "../config/ingredients";
import { ImageAsset } from "../config/ImageAsset";
import { LevelDescription } from "./LevelDescription";
import { firstx } from "./firstx";

type FoodID = Opaque<string, "FoodID">;

export class Food implements ICarryableItem, IWithID<FoodID> {
  private readonly ingredient: IngredientType;
  private readonly asset: ImageAsset;

  constructor(ingredient: IngredientType, asset?: ImageAsset) {
    this.ingredient = ingredient;
    this.asset = asset ?? firstx(getIngredientAssets(ingredient));
  }

  getID(): FoodID {
    return `${this.ingredient}` as FoodID;
  }

  getIngredient(): IngredientType {
    return this.ingredient;
  }

  render(levelDescription: LevelDescription): React.ReactNode {
    return this.renderAt(levelDescription, 0, 0);
  }

  renderAt(
    _levelDescription: LevelDescription,
    x: number,
    y: number,
  ): React.ReactNode {
    return <BlockSizedSprite key={this.getID()} x={x} y={y} url={this.asset} />;
  }
}
