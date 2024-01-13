import { AbilityType } from "../../../lib/AbilityType";
import { isBoundingBoxWithinMapBlock } from "../../../lib/isBoundingBoxWithinMapBlock";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class DeactivateAbilityStateReducer extends BaseStateReducer<
  ActionType.DeactivateAbility,
  NoArguments
> {
  public readonly ACTION = ActionType.DeactivateAbility;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.DeactivateAbility, NoArguments>,
  ): IState {
    const isStuck =
      state.player.ability.specialAbility === AbilityType.NoClip &&
      isBoundingBoxWithinMapBlock(state.player.boundingBox, state.levelMap);

    return {
      ...state,
      player: {
        ...state.player,
        ability: {
          ...state.player.ability,
          isAbilityActive: isStuck,
          shouldDeactivateAbilityOnUnstuck: isStuck,
        },
      },
    };
  }
}
