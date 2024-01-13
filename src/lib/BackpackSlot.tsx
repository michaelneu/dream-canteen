import { Group } from "../components/primitives/Group";
import { MonospaceText } from "../components/primitives/MonospaceText";
import { BLOCK_SIZE } from "../config";
import { ICarryableItem } from "../types/ICarryableItem";
import { LevelDescription } from "./LevelDescription";
import { InvariantViolationException } from "./invariant";

export class BackpackSlot implements ICarryableItem {
  renderAt(
    _levelDescription: LevelDescription,
    _x: number,
    _y: number,
  ): React.ReactNode {
    throw new InvariantViolationException(
      "Backpack slots should be treated specially and never be carried",
    );
  }

  render(): React.ReactNode {
    return (
      <Group x={0} y={0}>
        <MonospaceText
          fontSize={32}
          x={BLOCK_SIZE / 2}
          y={BLOCK_SIZE * 0.35}
          align="center"
          text="Empty"
          color="white"
        />

        <MonospaceText
          fontSize={24}
          x={BLOCK_SIZE / 2}
          y={BLOCK_SIZE * 0.75}
          align="center"
          text="Add Items"
          color="#ccc"
        />
      </Group>
    );
  }
}
