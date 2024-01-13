import { IState, IStateWithMaybeDerivedState } from "./IState";

export abstract class BaseDerivedStateReducer {
  abstract reduce(state: IStateWithMaybeDerivedState): IState;
}
