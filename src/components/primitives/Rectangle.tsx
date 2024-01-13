import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "@pixi/graphics";
import { useCallback } from "react";

interface IProps {
  color: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

export function Rectangle({ x, y, width, height, color }: IProps) {
  const drawRectangle = useCallback(
    (g: PixiGraphics) => {
      g.clear();
      g.beginFill(color);
      g.drawRect(x, y, width, height);
      g.endFill();
    },
    [color, x, y, width, height],
  );

  return <Graphics draw={drawRectangle} />;
}
