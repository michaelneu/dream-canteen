import clamp from "fbjs/lib/clamp";
import { isWithin } from "../lib/isWithin";
import { BLOCK_SIZE } from "../config";
import { Rectangle } from "./primitives/Rectangle";
import { Blinking } from "./Blinking";
import { Group } from "./primitives/Group";

interface IProps {
  progress: number;
  x: number;
  y: number;
}

const WIDTH = BLOCK_SIZE * 0.5;
const HEIGHT = BLOCK_SIZE * 0.15;
const BORDER_SIZE = 2;

export function ProgressBar({ progress, x, y }: IProps) {
  const progressBar = (
    <Rectangle
      x={BORDER_SIZE * 2}
      y={BORDER_SIZE * 2}
      width={(clamp(progress, 0, 100) / 100) * (WIDTH - BORDER_SIZE * 2)}
      height={HEIGHT - BORDER_SIZE * 2}
      color={getColor(progress)}
    />
  );

  return (
    <Group x={x - WIDTH / 2} y={y - HEIGHT / 2}>
      <Rectangle
        x={0}
        y={0}
        width={WIDTH + 2 * BORDER_SIZE}
        height={HEIGHT + 2 * BORDER_SIZE}
        color="#333"
      />

      <Rectangle
        x={BORDER_SIZE}
        y={BORDER_SIZE}
        width={WIDTH}
        height={HEIGHT}
        color="white"
      />

      {isWithin(progress, 100, 200) ? (
        <Blinking>{progressBar}</Blinking>
      ) : (
        progressBar
      )}
    </Group>
  );
}

function getColor(progress: number): string {
  if (progress > 200) {
    return "red";
  }

  return "green";
}
