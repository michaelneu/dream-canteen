import { Sprite as PIXISprite } from "@pixi/react";
import { ImageAsset } from "../../config/ImageAsset";

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  url: ImageAsset;
  opacity?: number;
}

export function UnscaledSprite({
  url,
  x,
  y,
  width,
  height,
  opacity = 1,
}: IProps) {
  return (
    <PIXISprite
      image={url}
      x={x}
      y={y}
      anchor={0}
      width={width}
      height={height}
      alpha={opacity}
    />
  );
}
