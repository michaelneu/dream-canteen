import { BLOCK_SIZE } from "../config";
import { ProgressBar } from "./ProgressBar";
import { Group } from "./primitives/Group";

const PROGRESS_BAR_X = BLOCK_SIZE / 2;
const PROGRESS_BAR_Y = BLOCK_SIZE * 0.2;

interface IProps {
  progress: number;
  x: number;
  y: number;
  children: React.ReactNode;
}

export function GroupWithProgressBar({ progress, x, y, children }: IProps) {
  return (
    <Group x={x} y={y}>
      {children}
      {progress > 0 ? (
        <ProgressBar
          progress={progress}
          x={PROGRESS_BAR_X}
          y={PROGRESS_BAR_Y}
        />
      ) : null}
    </Group>
  );
}
