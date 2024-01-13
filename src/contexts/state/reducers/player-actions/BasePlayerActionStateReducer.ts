import { ActionType } from "../../ActionType";
import { BaseStateReducer, NoArguments } from "../../BaseStateReducer";
import { IStateWithMaybeDerivedState } from "../../IState";

export abstract class BasePlayerActionStateReducer<
  TAction extends ActionType,
> extends BaseStateReducer<TAction, NoArguments> {
  abstract shouldRun(state: IStateWithMaybeDerivedState): boolean;
}
