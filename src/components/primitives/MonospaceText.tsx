import { Text } from "@pixi/react";
import clamp from "fbjs/lib/clamp";
import * as PIXI from "pixi.js";
import { useMemo } from "react";

interface IProps {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  color?: string;
  align?: "left" | "center" | "right";
  opacity?: number;
}

export function MonospaceText({
  x,
  y,
  text,
  fontSize,
  color = "white",
  align = "left",
  opacity = 1,
}: IProps) {
  const style = useMemo(() => {
    return new PIXI.TextStyle({
      fill: color,
      fontFamily: "Menlo, Consolas, Inconsolata, monospace",
      fontSize,
    });
  }, [color, fontSize]);

  return (
    <Text
      anchor={align === "left" ? 0 : align === "center" ? 0.5 : 1}
      text={text}
      x={x}
      y={y}
      style={style}
      alpha={clamp(opacity, 0, 1)}
    />
  );
}
