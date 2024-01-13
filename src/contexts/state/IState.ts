import { AbilityType } from "../../lib/AbilityType";
import { BoundingBox } from "../../lib/BoundingBox";
import { Direction } from "../../lib/Direction";
import { DroppedIngredientCollection } from "../../lib/DroppedIngredientCollection";
import { RecipeCollection } from "../../lib/FoodOrderCollection";
import { LevelDescription } from "../../lib/LevelDescription";
import { LevelMap } from "../../lib/LevelMap";
import { SelectedChoicesMenu } from "../../lib/SelectedChoicesMenu";
import { BaseBlock, BlockID } from "../../lib/blocks/BaseBlock";
import { ICarryableItem } from "../../types/ICarryableItem";
import { IngredientType } from "../../types/IngredientType";
import { Nullable } from "../../types/Nullable";
import { TimeNumber, Timestamp } from "../../types/Numbers";
import { ActionType } from "./ActionType";

interface IBackpack {
  items: readonly ICarryableItem[];
}

interface IAbilityState {
  specialAbility: Nullable<AbilityType>;
  isAbilityActive: boolean;
  shouldDeactivateAbilityOnUnstuck: boolean;
}

interface IPlayerState {
  boundingBox: BoundingBox;
  carriedItem: Nullable<ICarryableItem>;
  lookingDirection: Direction;
  isCurrentlyMoving: boolean;
  activeBlockID: Nullable<BlockID>;
  ability: IAbilityState;
  backpack: IBackpack;
  selectedChoicesMenu: Nullable<SelectedChoicesMenu>;
}

interface IIngredientDropState {
  droppedIngredients: DroppedIngredientCollection;
  ingredientTypeToDrop: Nullable<IngredientType>;
  ingredientsToDrop: number;
}

interface IPauseState {
  elapsedTime: TimeNumber;
}

interface IToast {
  key: string;
  text: string;
  color: string;
}

export interface IStateWithoutDerivedState {
  pause: Nullable<IPauseState>;
  levelDescription: LevelDescription;
  levelMap: LevelMap;
  score: number;
  scoreToast: Nullable<IToast>;
  startTime: Timestamp;
  player: IPlayerState;
  ingredientsDrop: IIngredientDropState;
  orders: RecipeCollection;
}

interface IDerivedPlayerState {
  lookedAtBlock: Nullable<BaseBlock>;
  availablePlayerAction: Nullable<ActionType>;
}

interface IDerivedState {
  player: IDerivedPlayerState;
  isGameRunning: boolean;
}

export interface IState extends IStateWithoutDerivedState {
  derived: IDerivedState;
}

export interface IStateWithMaybeDerivedState extends IStateWithoutDerivedState {
  derived?: IDerivedState;
}
