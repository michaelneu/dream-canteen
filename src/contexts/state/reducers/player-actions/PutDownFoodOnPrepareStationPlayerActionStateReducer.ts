import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { PrepareStationBlock } from "../../../../lib/blocks/PrepareStationBlock";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutDownFoodOnPrepareStationPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutDownFoodOnPrepareStation> {
  public readonly ACTION = ActionType.PutDownFoodOnPrepareStation;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.player.carriedItem instanceof Food &&
      state.levelDescription
        .getPrepareStation()
        .getTransitions()
        .has(state.player.carriedItem.getIngredient()) &&
      state.derived?.player.lookedAtBlock instanceof PrepareStationBlock &&
      state.derived.player.lookedAtBlock.getIsEmpty()
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutDownFoodOnPrepareStation, null>,
  ): IState {
    invariant(
      state.derived.player.lookedAtBlock instanceof PrepareStationBlock,
      "Unexpected block type",
    );

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        state.derived.player.lookedAtBlock.getID(),
        new PrepareStationBlock(
          state.derived.player.lookedAtBlock.getBoundingBox(),
          state.player.carriedItem,
          0,
        ),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
