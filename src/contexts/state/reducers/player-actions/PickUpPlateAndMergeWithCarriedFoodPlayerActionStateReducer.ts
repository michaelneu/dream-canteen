import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { Plate } from "../../../../lib/Plate";
import { CleanPlatesBlock } from "../../../../lib/blocks/CleanPlatesBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PickUpPlateAndMergeWithCarriedFoodPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PickUpPlateAndMergeWithCarriedFood> {
  public readonly ACTION = ActionType.PickUpPlateAndMergeWithCarriedFood;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Food &&
      state.derived?.player.lookedAtBlock instanceof CleanPlatesBlock &&
      state.derived.player.lookedAtBlock.getAvailablePlates() > 0
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<
      ActionType.PickUpPlateAndMergeWithCarriedFood,
      NoArguments
    >,
  ): IState {
    invariant(
      state.player.carriedItem instanceof Food,
      "Unexpected block type",
    );

    const lookedAtBlock = state.derived.player.lookedAtBlock;
    invariant(
      lookedAtBlock instanceof CleanPlatesBlock,
      "Unexpected block type",
    );

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        lookedAtBlock.getID(),
        lookedAtBlock.cloneWithRemovedPlate(),
      ),
      player: {
        ...state.player,
        carriedItem: new Plate([state.player.carriedItem]),
      },
    };
  }
}
