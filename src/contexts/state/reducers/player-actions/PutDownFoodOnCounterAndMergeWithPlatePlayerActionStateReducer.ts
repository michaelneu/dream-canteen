import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { Plate } from "../../../../lib/Plate";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownFoodOnCounterAndMergeWithPlatePlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownFoodOnCounterAndMergeWithPlate> {
  public readonly ACTION = ActionType.PutDownFoodOnCounterAndMergeWithPlate;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Food &&
      state.derived?.player.lookedAtBlock instanceof CounterBlock &&
      state.derived.player.lookedAtBlock.getStorage() instanceof Plate
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<
      ActionType.PutDownFoodOnCounterAndMergeWithPlate,
      NoArguments
    >,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof CounterBlock,
      "Unexpected block type",
    );

    invariant(
      state.player.carriedItem instanceof Food,
      "Expected to be carrying food",
    );

    const storage = state.derived.player.lookedAtBlock.getStorage();
    invariant(
      storage instanceof Plate,
      "Expected to have plate on the counter",
    );

    const updatedPlate = new Plate([
      ...storage.getContents(),
      state.player.carriedItem,
    ]);

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        state.derived.player.lookedAtBlock.getID(),
        new CounterBlock(
          state.derived.player.lookedAtBlock.getBoundingBox(),
          updatedPlate,
        ),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
