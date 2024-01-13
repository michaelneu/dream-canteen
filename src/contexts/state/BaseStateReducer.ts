import { ActionType } from "./ActionType";
import { IState, IStateWithoutDerivedState } from "./IState";

export type NoArguments = null;
export type ActionOf<TAction extends ActionType, TInput = NoArguments> = {
  type: TAction;
  data: TInput;
};

export abstract class BaseStateReducer<TAction extends ActionType, TInput> {
  public abstract readonly ACTION: TAction;

  abstract reduce(
    state: IState,
    action: ActionOf<TAction, TInput>,
  ): IStateWithoutDerivedState;
}
