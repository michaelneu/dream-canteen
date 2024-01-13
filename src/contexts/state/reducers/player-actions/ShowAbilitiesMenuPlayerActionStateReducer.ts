import { SelectedChoicesMenu } from "../../../../lib/SelectedChoicesMenu";
import { AbilitiesSelectionBlock } from "../../../../lib/blocks/AbilitiesSelectionBlock";
import { ActionType } from "../../ActionType";
import { ActionOf, NoArguments } from "../../BaseStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../../IState";
import { BasePlayerActionStateReducer } from "./BasePlayerActionStateReducer";

export class ShowAbilitiesMenuPlayerActionStateReducer extends BasePlayerActionStateReducer<ActionType.ShowAbilitiesMenu> {
  public readonly ACTION = ActionType.ShowAbilitiesMenu;

  shouldRun(state: IStateWithMaybeDerivedState): boolean {
    return (
      state.derived?.player.lookedAtBlock instanceof AbilitiesSelectionBlock
    );
  }

  reduce(
    state: IState,
    _action: ActionOf<ActionType.ShowAbilitiesMenu, NoArguments>,
  ): IState {
    return {
      ...state,
      player: {
        ...state.player,
        selectedChoicesMenu: SelectedChoicesMenu.Abilities,
      },
    };
  }
}
