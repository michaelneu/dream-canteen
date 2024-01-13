import { ImageAsset } from "../../config/ImageAsset";
import { UnscaledSprite } from "./UnscaledSprite";

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  url: ImageAsset;
  opacity?: number;
}

export function Sprite({ url, x, y, width, height, opacity }: IProps) {
  return (
    <UnscaledSprite
      opacity={opacity}
      url={url}
      x={x}
      y={y}
      width={width}
      height={height}
    />
  );
}
