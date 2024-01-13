import { BLOCK_GRAB_DISTANCE, BLOCK_PUT_DOWN_DISTANCE } from "../../../config";
import { Direction } from "../../../lib/Direction";
import { CounterBlock } from "../../../lib/blocks/CounterBlock";
import { ProgressStationAssistantBlock } from "../../../lib/blocks/ProgressStationAssistantBlock";
import { exhaustiveSwitchCase } from "../../../lib/exhaustiveSwitchCase";
import { getBlockContainingCoordinates } from "../../../lib/getBlockContainingCoordinates";
import { BaseDerivedStateReducer } from "../BaseDerivedStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../IState";

export class LookedAtBlockDerivedStateReducer extends BaseDerivedStateReducer {
  reduce(state: IStateWithMaybeDerivedState): IState {
    return {
      ...state,
      derived: {
        ...state.derived,
        player: {
          ...state.derived?.player,
          lookedAtBlock: getBlockContainingCoordinates(
            ...getLookedAtBlockLocation(
              state.player.boundingBox.getCenterX(),
              state.player.boundingBox.getCenterY(),
              state.player.carriedItem instanceof CounterBlock ||
                state.player.carriedItem instanceof
                  ProgressStationAssistantBlock
                ? BLOCK_PUT_DOWN_DISTANCE
                : BLOCK_GRAB_DISTANCE,
              state.player.lookingDirection,
            ),
            state.levelMap.getAllBlocks(),
          ),
        },
      },
    } as IState;
  }
}

function getLookedAtBlockLocation(
  x: number,
  y: number,
  size: number,
  direction: Direction,
): [x: number, y: number] {
  switch (direction) {
    case Direction.Down:
      return [x, y + size];
    case Direction.Right:
      return [x + size, y];
    case Direction.Up:
      return [x, y - size];
    case Direction.Left:
      return [x - size, y];
    default:
      throw exhaustiveSwitchCase(direction);
  }
}
