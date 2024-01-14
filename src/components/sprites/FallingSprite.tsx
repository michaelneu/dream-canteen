import { useRef, useState } from "react";
import { ImageAsset } from "../../config/ImageAsset";
import { Sprite } from "../primitives/Sprite";
import { Rotation } from "../primitives/Rotation";
import { useScreenSizeContext } from "../../contexts/ScreenSizeContext";
import { useInterval } from "../../hooks/useInterval";
import { Percentage, TimeNumber } from "../../types/Numbers";

interface IProps {
  url: ImageAsset;
  x: Percentage;
  width: number;
  height: number;
  speed: number;
  startOffset: number;
}

export function FallingSprite({
  url,
  x,
  startOffset,
  width,
  height,
  speed,
}: IProps) {
  const { width: screenWidth, height: screenHeight } = useScreenSizeContext();
  const [y, setY] = useState(startOffset);
  const [rotation, setRotation] = useState(Math.random());
  const rotationDirectionRef = useRef(1);

  useInterval(() => {
    setY((value) => {
      if (value >= 1.2) {
        return -0.2;
      }

      return value + speed;
    });

    setRotation((value) => {
      if (value < -0.5 || value > 0.5) {
        rotationDirectionRef.current *= -1;
      }

      return value + rotationDirectionRef.current * speed * 4;
    });
  }, 10 as TimeNumber);

  return (
    <Rotation x={x * screenWidth} y={y * screenHeight} rotation={rotation}>
      <Sprite
        x={0}
        y={0}
        width={width}
        height={height}
        url={url}
        opacity={0.5}
      />
    </Rotation>
  );
}
