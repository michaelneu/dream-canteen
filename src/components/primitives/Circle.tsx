import { Graphics } from "@pixi/react";
import { Graphics as PixiGraphics } from "@pixi/graphics";
import { useCallback } from "react";
import React from "react";
import clamp from "fbjs/lib/clamp";
import { Percentage } from "../../types/Numbers";
import { Degrees, degreesToRadians } from "../../lib/radians";

interface IProps {
  color: string;
  radius: number;
  fillPercentage: Percentage;
  x: number;
  y: number;
}

export function Circle({ x, y, radius, fillPercentage, color }: IProps) {
  const percentage = clamp(fillPercentage, 0, 1);

  const drawArc = useCallback(
    (g: PixiGraphics) => {
      g.clear()
        .lineStyle({
          color,
          miterLimit: 1,
          width: radius,
        })
        .arc(
          0,
          0,
          radius / 2,
          degreesToRadians(0 as Degrees),
          degreesToRadians(360 as Degrees) * percentage * 1.05,
        );
    },
    [color, percentage, radius],
  );

  return (
    <Graphics
      x={x}
      y={y}
      rotation={
        degreesToRadians(-93 as Degrees) -
        degreesToRadians(10 as Degrees) * percentage
      }
      anchor={0}
      draw={drawArc}
    />
  );
}
