import { BLOCK_SIZE } from "../config";
import { useGameStateContext } from "../contexts/GameStateContext";
import { Direction } from "../lib/Direction";
import { ICarryableItem } from "../types/ICarryableItem";
import { Group } from "./primitives/Group";

const SCALE = 0.3;

interface IProps {
  lookingDirection: Direction;
  item: ICarryableItem;
}

export function CarriedItem({ lookingDirection, item }: IProps) {
  const {
    state: { levelDescription },
  } = useGameStateContext();

  if (lookingDirection === Direction.Up) {
    return null;
  }

  let x = BLOCK_SIZE / 2;

  if (lookingDirection === Direction.Left) {
    x = BLOCK_SIZE * 0.25;
  } else if (lookingDirection === Direction.Right) {
    x = BLOCK_SIZE * 0.85;
  }

  return (
    <Group x={x} y={BLOCK_SIZE * 0.5} scale={SCALE}>
      {item.renderAt(levelDescription, 0, 0)}
    </Group>
  );
}
