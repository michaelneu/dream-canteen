import React from "react";
import { ICarryableItem } from "../types/ICarryableItem";
import { IRenderable } from "../types/IRenderable";
import { Group } from "../components/primitives/Group";
import { BlockSizedSprite } from "../components/sprites/BlockSizedSprite";
import { ImageAsset } from "../config/ImageAsset";
import { BLOCK_SIZE } from "../config";
import { LevelDescription } from "./LevelDescription";
import { Food } from "./Food";

export class Pot implements ICarryableItem, IRenderable {
  private contents: readonly Food[];

  constructor(contents: readonly Food[]) {
    this.contents = contents;
  }

  getContents(): readonly Food[] {
    return this.contents;
  }

  getIsEmpty(): boolean {
    return this.getContents().length === 0;
  }

  renderAt(
    levelDescription: LevelDescription,
    x: number,
    y: number,
  ): React.ReactNode {
    return (
      <Group x={x} y={y}>
        <BlockSizedSprite x={0} y={0} url={ImageAsset.Pot} />
        <Group x={0} y={0} scale={0.5}>
          {this.getContents().map((item, index) =>
            item.renderAt(levelDescription, index * BLOCK_SIZE, 0),
          )}
        </Group>
      </Group>
    );
  }

  render(levelDescription: LevelDescription): React.ReactNode {
    return this.renderAt(levelDescription, 0, 0);
  }
}
