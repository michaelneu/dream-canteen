import { useRef, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { BoundingBox } from "../lib/BoundingBox";
import { TimeNumber } from "../types/Numbers";
import { BLOCK_SIZE } from "../config";
import { ImageAsset } from "../config/ImageAsset";
import { Sprite } from "./primitives/Sprite";
import { BlockSizedRectangle } from "./BlockSizedRectangle";

const OVERSCALE = 1.2;

interface IProps {
  boundingBox: BoundingBox;
}

export function SelectionHighlight({ boundingBox }: IProps) {
  const [scale, setScale] = useState(1);
  const directionRef = useRef(1);

  useInterval(() => {
    if (scale > 1.2) {
      directionRef.current = -1;
    } else if (scale < 1) {
      directionRef.current = 1;
    }

    setScale((value) => value + directionRef.current * 0.005);
  }, 10 as TimeNumber);

  const size = BLOCK_SIZE * scale * OVERSCALE;

  return (
    <>
      <BlockSizedRectangle
        x={boundingBox.getTopLeftX()}
        y={boundingBox.getTopLeftY()}
        color="rgba(255, 255, 255, 0.1)"
      />

      <Sprite
        x={boundingBox.getCenterX() - size / 2}
        y={boundingBox.getCenterY() - size / 2}
        width={size}
        height={size}
        url={ImageAsset.Selection}
      />
    </>
  );
}
