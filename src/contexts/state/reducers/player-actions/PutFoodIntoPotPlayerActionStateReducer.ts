import { POT_MAX_CONTENTS } from "../../../../config";
import { Food } from "../../../../lib/Food";
import { LevelMap } from "../../../../lib/LevelMap";
import { Pot } from "../../../../lib/Pot";
import { BaseBlockWithStorage } from "../../../../lib/blocks/BaseBlockWithStorage";
import { invariant } from "../../../../lib/invariant";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class PutFoodIntoPotPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.PutFoodIntoPot> {
  public readonly ACTION = ActionType.PutFoodIntoPot;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    if (
      !(state.derived?.player.lookedAtBlock instanceof BaseBlockWithStorage)
    ) {
      return false;
    }

    const storage = state.derived.player.lookedAtBlock.getStorage();

    return (
      state.player.carriedItem instanceof Food &&
      storage instanceof Pot &&
      storage.getContents().length < POT_MAX_CONTENTS
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.PutFoodIntoPot, NoArguments>,
  ): IState {
    const lookedAtBlock = state.derived.player.lookedAtBlock;
    invariant(
      lookedAtBlock instanceof BaseBlockWithStorage,
      "Unexpected block type",
    );

    const pot = lookedAtBlock.getStorage();
    invariant(pot instanceof Pot, "Expected to have pot in storage");

    const food = state.player.carriedItem;
    invariant(food instanceof Food, "Expected to be carrying food");

    const potWithFoodAdded = new Pot([...pot.getContents(), food]);

    return {
      ...state,
      levelMap: LevelMap.fromReplaceSingleBlock(
        state.levelMap,
        lookedAtBlock.getID(),
        lookedAtBlock.cloneWithReplacedContent(potWithFoodAdded),
      ),
      player: {
        ...state.player,
        carriedItem: null,
      },
    };
  }
}
