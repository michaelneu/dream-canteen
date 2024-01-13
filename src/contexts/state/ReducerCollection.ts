import { invariant } from "../../lib/invariant";
import { ActionType } from "./ActionType";
import { BaseDerivedStateReducer } from "./BaseDerivedStateReducer";
import { ActionOf, BaseStateReducer } from "./BaseStateReducer";
import { AvailablePlayerActionDerivedStateReducer } from "./derived/AvailablePlayerActionDerivedStateReducer";
import { LookedAtBlockDerivedStateReducer } from "./derived/LookedAtBlockDerivedStateReducer";
import { ActivateAbilityStateReducer } from "./reducers/ActivateAbilityStateReducer";
import { AddNewRandomRecipeStateReducer } from "./reducers/AddNewRandomRecipeStateReducer";
import { CleanUpExpiredIngredientsStateReducer } from "./reducers/CleanUpExpiredIngredientsStateReducer";
import { DeactivateAbilityStateReducer } from "./reducers/DeactivateAbilityStateReducer";
import { DeliverFoodToCustomerPlayerActionStateReducer } from "./reducers/player-actions/DeliverFoodToCustomerPlayerActionStateReducer";
import { DropIngredientStateReducer } from "./reducers/DropIngredientStateReducer";
import { HideCurrentChoicesMenuStateReducer } from "./reducers/HideCurrentChoicesMenuStateReducer";
import { IncreaseProgressBlocksStateReducer } from "./reducers/IncreaseProgressBlocksStateReducer";
import { MovePlayerStateReducer } from "./reducers/MovePlayerStateReducer";
import { SelectAbilityStateReducer } from "./reducers/SelectAbilityStateReducer";
import { ShowAbilitiesMenuPlayerActionStateReducer } from "./reducers/player-actions/ShowAbilitiesMenuPlayerActionStateReducer";
import { StartIngredientDropStateReducer } from "./reducers/StartIngredientDropStateReducer";
import { BasePlayerActionStateReducer } from "./reducers/player-actions/BasePlayerActionStateReducer";
import { PickUpCounterPlayerActionStateReducer } from "./reducers/player-actions/PickUpCounterPlayerActionStateReducer";
import { PickUpFoodFromCounterPlayerActionStateReducer } from "./reducers/player-actions/PickUpFoodFromBlockPlayerActionStateReducer";
import { PickUpFoodFromCookingStationPlayerActionStateReducer } from "./reducers/player-actions/PickUpFoodFromCookingStationPlayerActionStateReducer";
import { PickUpFoodFromPrepareStationPlayerActionStateReducer } from "./reducers/player-actions/PickUpFoodFromPrepareStationPlayerActionStateReducer";
import { PutCarriedItemInTrashPlayerActionStateReducer } from "./reducers/player-actions/PutCarriedItemInTrashPlayerActionStateReducer";
import { PutDownCounterPlayerActionStateReducer } from "./reducers/player-actions/PutDownCounterPlayerActionStateReducer";
import { PutDownFoodOnCookingStationPlayerActionStateReducer } from "./reducers/player-actions/PutDownFoodOnCookingStationPlayerActionStateReducer";
import { PutDownFoodOnCounterPlayerActionStateReducer } from "./reducers/player-actions/PutDownFoodOnCounterPlayerActionStateReducer";
import { PutDownFoodOnPrepareStationPlayerActionStateReducer } from "./reducers/player-actions/PutDownFoodOnPrepareStationPlayerActionStateReducer";
import { ShowSupplyMenuPlayerActionStateReducer } from "./reducers/player-actions/ShowSupplyMenuPlayerActionStateReducer";
import { StartPrepareStationPlayerActionStateReducer } from "./reducers/player-actions/StartPrepareStationPlayerActionStateReducer";
import { PickUpDroppedIngredientPlayerActionStateReducer } from "./reducers/player-actions/PickUpDroppedIngredientPlayerActionStateReducer";
import { PickUpCleanPlatePlayerActionStateReducer } from "./reducers/player-actions/PickUpCleanPlatePlayerActionStateReducer";
import { PutPlateOnCounterPlayerActionStateReducer } from "./reducers/player-actions/PutPlateOnCounterPlayerActionStateReducer";
import { PickUpPlateAndMergeWithCarriedFoodPlayerActionStateReducer } from "./reducers/player-actions/PickUpPlateAndMergeWithCarriedFoodPlayerActionStateReducer";
import { PutDownFoodOnCounterAndMergeWithPlatePlayerActionStateReducer } from "./reducers/player-actions/PutDownFoodOnCounterAndMergeWithPlatePlayerActionStateReducer";
import { PickUpFoodFromCounterAndMergeWithPlatePlayerActionStateReducer } from "./reducers/player-actions/PickUpFoodFromCounterAndMergeWithPlatePlayerActionStateReducer";
import { PutDownProgressStationAssistantPlayerActionStateReducer } from "./reducers/player-actions/PutDownProgressStationAssistantPlayerActionStateReducer";
import { PickUpProgressStationAssistantPlayerActionStateReducer } from "./reducers/player-actions/PickUpProgressStationAssistantPlayerActionStateReducer";
import { PutFoodIntoPotPlayerActionStateReducer } from "./reducers/player-actions/PutFoodIntoPotPlayerActionStateReducer";
import { ReplaceBackpackItemStateReducer } from "./reducers/ReplaceBackpackItemStateReducer";
import { PauseGameStateReducer } from "./reducers/PauseGameStateReducer";
import { UnpauseGameStateReducer } from "./reducers/UnpauseGameStateReducer";
import { IsGameRunningDerivedStateReducer } from "./derived/IsGameRunningDerivedStateReducer";
import { PutDownPotOnCounterPlayerActionStateReducer } from "./reducers/player-actions/PutDownPotOnCounterPlayerActionStateReducer";
import { PutDownPotOnCookingStationPlayerActionStateReducer } from "./reducers/player-actions/PutDownPotOnCookingStationPlayerActionStateReducer";

const STATE_REDUCERS = [
  new ActivateAbilityStateReducer(),
  new AddNewRandomRecipeStateReducer(),
  new CleanUpExpiredIngredientsStateReducer(),
  new DeactivateAbilityStateReducer(),
  new DeliverFoodToCustomerPlayerActionStateReducer(),
  new DropIngredientStateReducer(),
  new HideCurrentChoicesMenuStateReducer(),
  new IncreaseProgressBlocksStateReducer(),
  new MovePlayerStateReducer(),
  new SelectAbilityStateReducer(),
  new ShowAbilitiesMenuPlayerActionStateReducer(),
  new ShowSupplyMenuPlayerActionStateReducer(),
  new StartIngredientDropStateReducer(),
  new PickUpCounterPlayerActionStateReducer(),
  new PutDownCounterPlayerActionStateReducer(),
  new StartPrepareStationPlayerActionStateReducer(),
  new PutDownFoodOnCounterPlayerActionStateReducer(),
  new PickUpFoodFromCounterPlayerActionStateReducer(),
  new PutCarriedItemInTrashPlayerActionStateReducer(),
  new PutDownFoodOnPrepareStationPlayerActionStateReducer(),
  new PickUpFoodFromPrepareStationPlayerActionStateReducer(),
  new PutDownFoodOnCookingStationPlayerActionStateReducer(),
  new PickUpFoodFromCookingStationPlayerActionStateReducer(),
  new PickUpDroppedIngredientPlayerActionStateReducer(),
  new PickUpCleanPlatePlayerActionStateReducer(),
  new PutPlateOnCounterPlayerActionStateReducer(),
  new PickUpPlateAndMergeWithCarriedFoodPlayerActionStateReducer(),
  new PutDownFoodOnCounterAndMergeWithPlatePlayerActionStateReducer(),
  new PickUpFoodFromCounterAndMergeWithPlatePlayerActionStateReducer(),
  new PutDownProgressStationAssistantPlayerActionStateReducer(),
  new PickUpProgressStationAssistantPlayerActionStateReducer(),
  new ReplaceBackpackItemStateReducer(),
  new PauseGameStateReducer(),
  new UnpauseGameStateReducer(),
  new PutFoodIntoPotPlayerActionStateReducer(),
  new PutDownPotOnCounterPlayerActionStateReducer(),
  new PutDownPotOnCookingStationPlayerActionStateReducer(),
];

const DERIVED_STATE_REDUCERS = [
  new LookedAtBlockDerivedStateReducer(),
  new AvailablePlayerActionDerivedStateReducer(),
  new IsGameRunningDerivedStateReducer(),
];

type ActionFromReducer<TReducer> = TReducer extends BaseStateReducer<
  infer TAction,
  infer TInput
>
  ? ActionOf<TAction, TInput>
  : never;

type Reducers = (typeof STATE_REDUCERS)[number];
export type Actions = ActionFromReducer<Reducers>;

class ReducerCollection {
  private readonly lookup: ReadonlyMap<
    ActionType,
    BaseStateReducer<ActionType, unknown>
  >;

  private readonly actionReducers: readonly BasePlayerActionStateReducer<ActionType>[];

  constructor() {
    this.lookup = STATE_REDUCERS.reduce((lookup, reducer) => {
      const existingReducer = lookup.get(reducer.ACTION);
      invariant(
        existingReducer == null,
        `Duplicate reducer for ${reducer.ACTION}: already have ${existingReducer?.constructor?.name}, tried using ${reducer.constructor.name}`,
      );

      lookup.set(reducer.ACTION, reducer);
      return lookup;
    }, new Map<ActionType, BaseStateReducer<ActionType, unknown>>());

    const missingReducers = Object.values(ActionType).filter(
      (action) =>
        !isNaN(Number(action)) && !this.lookup.has(action as ActionType),
    );

    invariant(
      missingReducers.length === 0,
      `Missing reducers: ${missingReducers.join(", ")}`,
    );

    this.actionReducers = STATE_REDUCERS.filter(
      (reducer) => reducer instanceof BasePlayerActionStateReducer,
    ) as BasePlayerActionStateReducer<ActionType>[];
  }

  getReducer(action: ActionType): BaseStateReducer<ActionType, unknown> {
    const reducer = this.lookup.get(action);
    invariant(reducer != null, `Unable to find reducer for ${action}`);
    return reducer;
  }

  getAllPlayerActionReducers(): readonly BasePlayerActionStateReducer<ActionType>[] {
    return this.actionReducers;
  }

  getAllDerivedStateReducers(): readonly BaseDerivedStateReducer[] {
    return DERIVED_STATE_REDUCERS;
  }
}

export const REDUCERS = new ReducerCollection();
