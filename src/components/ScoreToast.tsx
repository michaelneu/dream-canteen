import { useState } from "react";
import React from "react";
import { useInterval } from "../hooks/useInterval";
import { TimeNumber } from "../types/Numbers";
import { MonospaceText } from "./primitives/MonospaceText";

interface IProps {
  x: number;
  sourceY: number;
  destinationY: number;
  label: string;
  color: string;
}

export function ScoreToast({ x, sourceY, destinationY, label, color }: IProps) {
  const [animationProgress, setAnimationProgress] = useState(0);

  useInterval(
    () => {
      setAnimationProgress((value) => value + 0.05);
    },
    (animationProgress < 1 ? 20 : 0) as TimeNumber,
  );

  const offsetY = (destinationY - sourceY) * animationProgress;

  return (
    <MonospaceText
      align="right"
      fontSize={26}
      color={color}
      text={label}
      x={x}
      y={sourceY + offsetY}
      opacity={1 - animationProgress}
    />
  );
}
