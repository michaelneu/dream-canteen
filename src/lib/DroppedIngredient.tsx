import React from "react";
import { ICoordinate } from "../types/ICoordinate";
import { IRenderable } from "../types/IRenderable";
import { IWithID } from "../types/IWithID";
import { Opaque } from "../types/OpaqueType";
import { DroppingContainer } from "../components/DroppingContainer";
import { BlinkingAfter } from "../components/BlinkingAfter";
import { Group } from "../components/primitives/Group";
import { BLOCK_SIZE, INGREDIENTS_BLINK_AFTER_MS } from "../config";
import { IngredientType } from "../types/IngredientType";
import { Timestamp } from "../types/Numbers";
import { ICarryableItem } from "../types/ICarryableItem";
import { INGREDIENTS } from "../config/ingredients";
import { LevelDescription } from "./LevelDescription";
import { currentTime } from "./currentTime";
import { Food } from "./Food";
import { Pot } from "./Pot";

const FOOD_SCALE = 0.5;
const FOOD_CENTER_OFFSET = (BLOCK_SIZE * FOOD_SCALE) / 2;

type DroppedIngredientID = Opaque<string, "DroppedIngredientID">;

export class DroppedIngredient
  implements IWithID<DroppedIngredientID>, IRenderable
{
  private readonly type: IngredientType;
  private readonly location: ICoordinate;
  private readonly createdTime: Timestamp;

  constructor(type: IngredientType, location: ICoordinate) {
    this.type = type;
    this.location = location;
    this.createdTime = currentTime();
  }

  getID(): DroppedIngredientID {
    return `${this.constructor.name}-${this.type}-${this.location.x}-${this.location.y}` as DroppedIngredientID;
  }

  getType(): IngredientType {
    return this.type;
  }

  getLocation(): ICoordinate {
    return this.location;
  }

  getCreatedTime(): Timestamp {
    return this.createdTime;
  }

  toPickedUpItem(): ICarryableItem {
    if (this.getType() === INGREDIENTS.POT) {
      return new Pot([]);
    }

    return new Food(this.getType());
  }

  render(levelDescription: LevelDescription): React.ReactNode {
    const food = new Food(this.getType()).render(levelDescription);

    return (
      <DroppingContainer
        key={this.getID()}
        x={this.getLocation().x - FOOD_CENTER_OFFSET}
        y={this.getLocation().y - FOOD_CENTER_OFFSET}
      >
        <Group x={0} y={0} scale={FOOD_SCALE}>
          <BlinkingAfter delayMS={INGREDIENTS_BLINK_AFTER_MS}>
            {food}
          </BlinkingAfter>
        </Group>
      </DroppingContainer>
    );
  }
}
