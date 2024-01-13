import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class HideCurrentChoicesMenuStateReducer extends BaseStateReducer<
  ActionType.HideCurrentChoicesMenu,
  NoArguments
> {
  public readonly ACTION = ActionType.HideCurrentChoicesMenu;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.HideCurrentChoicesMenu, NoArguments>,
  ): IState {
    return {
      ...state,
      player: {
        ...state.player,
        selectedChoicesMenu: null,
      },
    };
  }
}
