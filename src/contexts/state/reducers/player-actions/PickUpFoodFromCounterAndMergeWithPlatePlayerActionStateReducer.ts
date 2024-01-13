import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { Plate } from "../../../../lib/Plate";
import { CounterBlock } from "../../../../lib/blocks/CounterBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpFoodFromCounterAndMergeWithPlatePlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpFoodFromCounterAndMergeWithPlate> {
  public readonly ACTION = ActionType.PickUpFoodFromCounterAndMergeWithPlate;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Plate &&
      state.derived?.player.lookedAtBlock instanceof CounterBlock &&
      state.derived.player.lookedAtBlock.getStorage() instanceof Food
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<
      ActionType.PickUpFoodFromCounterAndMergeWithPlate,
      NoArguments
    >,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof CounterBlock,
      "Unexpected block type",
    );

    invariant(
      state.player.carriedItem instanceof Plate,
      "Expected to be carrying plate",
    );

    const storage = state.derived.player.lookedAtBlock.getStorage();
    invariant(storage instanceof Food, "Expected to have food on the counter");

    const updatedPlate = new Plate([
      ...state.player.carriedItem.getContents(),
      storage,
    ]);

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        state.derived.player.lookedAtBlock.getID(),
        new CounterBlock(
          state.derived.player.lookedAtBlock.getBoundingBox(),
          null,
        ),
      ),
      player: {
        ...state.player,
        carriedItem: updatedPlate,
      },
    };
  }
}
