import { AbilityType } from "../../../lib/AbilityType";
import { BackpackSlot } from "../../../lib/BackpackSlot";
import { BaseBlock } from "../../../lib/blocks/BaseBlock";
import { ICarryableItem } from "../../../types/ICarryableItem";
import { IRenderable } from "../../../types/IRenderable";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer } from "../BaseStateReducer";
import { IState } from "../IState";

interface IInput {
  item: ICarryableItem & IRenderable;
}

export class ReplaceBackpackItemStateReducer extends BaseStateReducer<
  ActionType.ReplaceBackpackItem,
  IInput
> {
  public readonly ACTION = ActionType.ReplaceBackpackItem;

  reduce(
    state: IState,
    action: ActionOf<ActionType.ReplaceBackpackItem, IInput>,
  ): IState {
    if (state.player.ability.specialAbility !== AbilityType.Backpack) {
      return state;
    }

    if (state.player.carriedItem instanceof BaseBlock) {
      return state;
    }

    return {
      ...state,
      player: {
        ...state.player,
        backpack: {
          ...state.player.backpack,
          items: state.player.backpack.items.map((item) => {
            if (item === action.data.item) {
              return state.player.carriedItem == null
                ? new BackpackSlot()
                : state.player.carriedItem;
            }
            return item;
          }),
        },
        carriedItem:
          action.data.item instanceof BackpackSlot ? null : action.data.item,
        selectedChoicesMenu: null,
      },
    };
  }
}
