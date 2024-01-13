import { AbilityType } from "../../../lib/AbilityType";
import { BackpackSlot } from "../../../lib/BackpackSlot";
import { BoundingBox } from "../../../lib/BoundingBox";
import { LevelMap } from "../../../lib/LevelMap";
import { FreeBlock } from "../../../lib/blocks/FreeBlock";
import { ProgressStationAssistantBlock } from "../../../lib/blocks/ProgressStationAssistantBlock";
import { ActionType } from "../ActionType";
import { ActionOf, BaseStateReducer } from "../BaseStateReducer";
import { IState } from "../IState";

interface IInput {
  ability: AbilityType;
}

export class SelectAbilityStateReducer extends BaseStateReducer<
  ActionType.SelectAbility,
  IInput
> {
  public readonly ACTION = ActionType.SelectAbility;

  reduce(
    state: IState,
    action: ActionOf<ActionType.SelectAbility, IInput>,
  ): IState {
    if (
      (action.data.ability === AbilityType.ProgressStationAssistant &&
        state.player.carriedItem != null) ||
      state.player.carriedItem instanceof ProgressStationAssistantBlock
    ) {
      return state;
    }

    let updatedState: IState = {
      ...state,
      player: {
        ...state.player,
        ability: {
          ...state.player.ability,
          specialAbility: action.data.ability,
        },
        backpack: {
          items: [new BackpackSlot(), new BackpackSlot(), new BackpackSlot()],
        },
        selectedChoicesMenu: null,
      },
    };

    if (
      state.player.ability.specialAbility ===
      AbilityType.ProgressStationAssistant
    ) {
      const existingAssitantBlock = state.levelMap
        .getAllNonFreeBlocks()
        .find((block) => block instanceof ProgressStationAssistantBlock);

      if (existingAssitantBlock != null) {
        updatedState = {
          ...updatedState,
          levelMap: LevelMap.fromReplaceSingleBlock(
            updatedState.levelMap,
            existingAssitantBlock.getID(),
            new FreeBlock(existingAssitantBlock.getBoundingBox()),
          ),
        };
      }
    }

    if (action.data.ability === AbilityType.ProgressStationAssistant) {
      updatedState = {
        ...updatedState,
        player: {
          ...updatedState.player,
          carriedItem: new ProgressStationAssistantBlock(new BoundingBox(0, 0)),
        },
      };
    }

    return updatedState;
  }
}
