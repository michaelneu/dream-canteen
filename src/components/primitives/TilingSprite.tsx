import { TilingSprite as PIXITilingSprite } from "@pixi/react";

interface IProps {
  x: number;
  y: number;
  width: number;
  height: number;
  url: string;
}

export function TilingSprite({ x, y, width, height, url }: IProps) {
  return (
    <PIXITilingSprite
      x={x}
      y={y}
      width={width}
      height={height}
      image={url}
      tilePosition={0}
    />
  );
}
