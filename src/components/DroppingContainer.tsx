import React, { useState } from "react";
import { useIntervalDuringGame } from "../hooks/useIntervalDuringGame";
import { TimeNumber } from "../types/Numbers";
import { INTERVAL_DISABLED } from "../hooks/useInterval";
import { Group } from "./primitives/Group";

interface IProps {
  x: number;
  y: number;
  children: React.ReactNode;
}

export function DroppingContainer({ x, y, children }: IProps) {
  const [dropProgress, setDropProgress] = useState(0);

  useIntervalDuringGame(
    () => {
      setDropProgress((value) => value + 0.01);
    },
    dropProgress < 1 ? (10 as TimeNumber) : INTERVAL_DISABLED,
  );

  return (
    <Group x={x} y={y * easeOutBounce(dropProgress)}>
      {children}
    </Group>
  );
}

// see https://easings.net/#easeOutBounce
function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}
