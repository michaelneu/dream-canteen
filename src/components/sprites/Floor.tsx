import React from "react";
import { useGameStateContext } from "../../contexts/GameStateContext";
import { range } from "../../lib/range";
import { BLOCK_SIZE } from "../../config";
import { UnscaledSprite } from "../primitives/UnscaledSprite";
import { ImageAsset } from "../../config/ImageAsset";

const TEXTURE_OFFSET_X = -30 - BLOCK_SIZE;
const TEXTURE_OFFSET_Y = -20 - BLOCK_SIZE;
const TEXTURE_SCALE_OFFSET = 1.25;

export function Floor() {
  const {
    state: { levelMap },
  } = useGameStateContext();

  return (
    <>
      {range(0, levelMap.getRows()).map((row) =>
        row % 2 === 0 ? null : (
          <React.Fragment key={row}>
            {range(0, levelMap.getColumns()).map((column) =>
              column % 2 === 0 ? null : (
                <UnscaledSprite
                  key={column}
                  x={column * BLOCK_SIZE + TEXTURE_OFFSET_X}
                  y={row * BLOCK_SIZE + TEXTURE_OFFSET_Y}
                  width={BLOCK_SIZE * 2 * TEXTURE_SCALE_OFFSET}
                  height={BLOCK_SIZE * 2 * TEXTURE_SCALE_OFFSET}
                  url={ImageAsset.FloorGrid}
                  opacity={0.5}
                />
              ),
            )}
          </React.Fragment>
        ),
      )}
    </>
  );
}
