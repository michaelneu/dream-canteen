import { BLOCK_SIZE } from "../config";
import { Percentage } from "../types/Numbers";
import { Group } from "./primitives/Group";
import { Rectangle } from "./primitives/Rectangle";

const BORDER_SIZE_PERCENT = 0.1 as Percentage;
const BORDER_SIZE = BLOCK_SIZE * BORDER_SIZE_PERCENT;

interface IProps {
  x: number;
  y: number;
}

interface IPropsWithSingleColor extends IProps {
  color: string;
}

interface IPropsWithBorderAndFillColor extends IProps {
  fillColor: string;
  borderColor: string;
}

export function BlockSizedRectangle(
  props: IPropsWithBorderAndFillColor | IPropsWithSingleColor,
) {
  let fillColor = "";
  let borderColor = "";

  if ("color" in props) {
    fillColor = props.color;
    borderColor = props.color;
  } else {
    fillColor = props.fillColor;
    borderColor = props.borderColor;
  }

  return (
    <Group x={props.x} y={props.y}>
      <Rectangle
        x={0}
        y={0}
        width={BLOCK_SIZE as any}
        height={BLOCK_SIZE as any}
        color={borderColor}
      />

      <Rectangle
        x={BORDER_SIZE}
        y={BORDER_SIZE}
        width={BLOCK_SIZE - BORDER_SIZE * 2}
        height={BLOCK_SIZE - BORDER_SIZE * 2}
        color={fillColor}
      />
    </Group>
  );
}
