import { BLOCK_SIZE } from "../config";
import { Percentage } from "../types/Numbers";
import { BlockSizedRectangle } from "./BlockSizedRectangle";
import { Group } from "./primitives/Group";

const BORDER_SIZE_PERCENT = 0.1 as Percentage;
const BORDER_SIZE = BLOCK_SIZE * BORDER_SIZE_PERCENT;
const REMAINING_WIDTH_PERCENT = (1 - 2 * BORDER_SIZE_PERCENT) as Percentage;

interface IProps {
  x: number;
  y: number;
  borderColor: string;
  children: React.ReactNode;
}

export function BlockSizedGroupWithBorder({
  x,
  y,
  borderColor,
  children,
}: IProps) {
  return (
    <Group x={x} y={y}>
      <BlockSizedRectangle x={0} y={0} color={borderColor} />

      <Group x={BORDER_SIZE} y={BORDER_SIZE} scale={REMAINING_WIDTH_PERCENT}>
        {children}
      </Group>
    </Group>
  );
}
