import nullthrows from "fbjs/lib/nullthrows";
import { AbilityType } from "../../../lib/AbilityType";
import { Food } from "../../../lib/Food";
import { SelectedChoicesMenu } from "../../../lib/SelectedChoicesMenu";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer, NoArguments } from "../BaseStateReducer";
import { IState } from "../IState";

export class ActivateAbilityStateReducer extends BaseStateReducer<
  ActionType.ActivateAbility,
  NoArguments
> {
  public readonly ACTION = ActionType.ActivateAbility;

  reduce(
    state: IState,
    _action: ActionOf<ActionType.ActivateAbility, NoArguments>,
  ): IState {
    if (state.player.ability.specialAbility == null) {
      return state;
    }

    switch (state.player.ability.specialAbility) {
      case AbilityType.Backpack:
        if (state.player.selectedChoicesMenu != null) {
          return state;
        }

        return {
          ...state,
          player: {
            ...state.player,
            selectedChoicesMenu: SelectedChoicesMenu.Backpack,
          },
        };

      case AbilityType.AutoPrepareIngredients:
        if (
          !(state.player.carriedItem instanceof Food) ||
          !state.levelDescription
            .getPrepareStation()
            .getTransitions()
            .has(state.player.carriedItem.getIngredient())
        ) {
          return state;
        }

        return {
          ...state,
          player: {
            ...state.player,
            carriedItem: new Food(
              nullthrows(
                state.levelDescription
                  .getPrepareStation()
                  .getTransitions()
                  .get(state.player.carriedItem.getIngredient()),
              ),
            ),
          },
        };
    }

    return {
      ...state,
      player: {
        ...state.player,
        ability: {
          ...state.player.ability,
          isAbilityActive: true,
          shouldDeactivateAbilityOnUnstuck: false,
        },
      },
    };
  }
}
