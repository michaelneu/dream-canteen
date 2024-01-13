import { BaseDerivedStateReducer } from "../BaseDerivedStateReducer";
import { IState, IStateWithMaybeDerivedState } from "../IState";
import { REDUCERS } from "../ReducerCollection";

export class AvailablePlayerActionDerivedStateReducer extends BaseDerivedStateReducer {
  reduce(state: IStateWithMaybeDerivedState): IState {
    return {
      ...state,
      derived: {
        ...state.derived,
        player: {
          ...state.derived?.player,
          availablePlayerAction:
            state.player.ability.isAbilityActive ||
            state.player.selectedChoicesMenu != null
              ? null
              : REDUCERS.getAllPlayerActionReducers().find((reducer) =>
                  reducer.shouldRun(state as IState),
                )?.ACTION,
        },
      },
    } as IState;
  }
}
