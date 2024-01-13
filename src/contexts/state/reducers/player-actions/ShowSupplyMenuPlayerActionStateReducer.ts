import { SelectedChoicesMenu } from "../../../../lib/SelectedChoicesMenu";
import { SuppliesBlock } from "../../../../lib/blocks/SuppliesBlock";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class ShowSupplyMenuPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.ShowSupplyMenu> {
  public readonly ACTION = ActionType.ShowSupplyMenu;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return state.derived?.player.lookedAtBlock instanceof SuppliesBlock;
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.ShowSupplyMenu, NoArguments>,
  ): IState {
    return {
      ...state,
      player: {
        ...state.player,
        selectedChoicesMenu: SelectedChoicesMenu.Supplies,
      },
    };
  }
}
