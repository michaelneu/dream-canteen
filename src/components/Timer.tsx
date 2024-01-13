import { useState } from "react";
import { useGameStateContext } from "../contexts/GameStateContext";
import { BLOCK_SIZE, GAME_DURATION } from "../config";
import { Percentage, TimeNumber } from "../types/Numbers";
import { useInterval } from "../hooks/useInterval";
import { currentTime } from "../lib/currentTime";
import { Circle } from "./primitives/Circle";
import { Group } from "./primitives/Group";
import { Blinking } from "./Blinking";

const CRITICAL_THRESHOLD = 0.25;

interface IProps {
  x: number;
  y: number;
}

export function Timer({ x, y }: IProps) {
  const {
    state: { startTime },
  } = useGameStateContext();

  const [passedTimePercentage, setPassedTimePercentage] = useState(
    1 as Percentage,
  );

  useInterval(
    () => {
      const passedTime = currentTime() - startTime;
      setPassedTimePercentage((passedTime / GAME_DURATION) as Percentage);
    },
    (passedTimePercentage > 0 ? 100 : 0) as TimeNumber,
  );

  const isCritical = 1 - passedTimePercentage < CRITICAL_THRESHOLD;
  const coloredCircle = (
    <Circle
      x={0}
      y={0}
      radius={BLOCK_SIZE * 0.4}
      color={isCritical ? "red" : "#abcdef"}
      fillPercentage={1 as Percentage}
    />
  );

  return (
    <Group x={x} y={y}>
      <Circle
        x={0}
        y={0}
        radius={BLOCK_SIZE * 0.5}
        color="#333"
        fillPercentage={1 as Percentage}
      />

      <Circle
        x={0}
        y={0}
        radius={BLOCK_SIZE * 0.45}
        color="white"
        fillPercentage={1 as Percentage}
      />

      {isCritical ? <Blinking>{coloredCircle}</Blinking> : coloredCircle}

      <Circle
        x={0}
        y={0}
        radius={BLOCK_SIZE * 0.4}
        color="white"
        fillPercentage={passedTimePercentage}
      />
    </Group>
  );
}
