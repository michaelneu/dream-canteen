import React from "react";
import { LevelDescription } from "../lib/LevelDescription";
import { IRenderable } from "./IRenderable";

export interface ICarryableItem extends IRenderable {
  renderAt(
    levelDescription: LevelDescription,
    x: number,
    y: number,
  ): React.ReactNode;
}
