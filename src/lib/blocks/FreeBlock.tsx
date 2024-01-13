import React from "react";
import { LevelDescription } from "../LevelDescription";
import { BaseBlock } from "./BaseBlock";

export class FreeBlock extends BaseBlock {
  render(_levelDescription: LevelDescription): React.ReactNode {
    return null;
  }

  static getStringRepresentationForParsing(): string {
    return "0";
  }
}
