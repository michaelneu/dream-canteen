import React from "react";
import { LevelDescription } from "../lib/LevelDescription";

export interface IRenderable {
  render(levelDescription: LevelDescription): React.ReactNode;
}
