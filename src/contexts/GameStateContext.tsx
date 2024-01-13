import React, { useMemo, useReducer } from "react";
import { useContextOrThrow } from "../hooks/useContextOrThrow";
import { Nullable } from "../types/Nullable";
import { DroppedIngredientCollection } from "../lib/DroppedIngredientCollection";
import { Direction } from "../lib/Direction";
import { firstx } from "../lib/firstx";
import { RecipeCollection } from "../lib/FoodOrderCollection";
import { BackpackSlot } from "../lib/BackpackSlot";
import { LevelDescription } from "../lib/LevelDescription";
import { currentTime } from "../lib/currentTime";
import { NoArguments } from "./state/BaseStateReducer";
import { IState } from "./state/IState";
import { ActionType } from "./state/ActionType";
import { Actions, REDUCERS } from "./state/ReducerCollection";

export type ArgumentLessAction<TAction extends ActionType> = {
  type: TAction;
  data: NoArguments;
} extends Actions
  ? TAction
  : never;

interface IGameStateContext {
  state: IState;
  dispatch: (action: Actions) => void;
}

function reducer(state: IState, action: Actions): IState {
  const concreteReducer = REDUCERS.getReducer(action.type);

  try {
    let reducedState = concreteReducer.reduce(state, action);

    for (const deriver of REDUCERS.getAllDerivedStateReducers()) {
      reducedState = deriver.reduce(reducedState);
    }

    return reducedState as IState;
  } catch (error) {
    console.error(error);
    console.warn("Not updating state due to error");
    return state;
  }
}

const Context = React.createContext<Nullable<IGameStateContext>>(null);
Context.displayName = "GameStateContext";

interface IProps {
  children: React.ReactNode;
  level: LevelDescription;
}

function GameStateContextProvider({ children, level }: IProps) {
  const [state, dispatch] = useReducer(
    reducer,
    () => {},
    (): IState => {
      const spawn = firstx(level.getLevelMap().getSpawnBlocks());

      return {
        derived: {
          isGameRunning: true,
          player: {
            availablePlayerAction: null,
            lookedAtBlock: null,
          },
        },
        ingredientsDrop: {
          droppedIngredients: new DroppedIngredientCollection([]),
          ingredientTypeToDrop: null,
          ingredientsToDrop: 0,
        },
        levelDescription: level,
        levelMap: level.getLevelMap(),
        orders: new RecipeCollection([]),
        pause: null,
        player: {
          ability: {
            isAbilityActive: false,
            shouldDeactivateAbilityOnUnstuck: false,
            specialAbility: null,
          },
          activeBlockID: null,
          backpack: {
            items: [new BackpackSlot(), new BackpackSlot(), new BackpackSlot()],
          },
          boundingBox: spawn.getBoundingBox(),
          carriedItem: null,
          isCurrentlyMoving: false,
          lookingDirection: Direction.Down,
          selectedChoicesMenu: null,
        },
        score: 0,
        scoreToast: null,
        startTime: currentTime(),
      };
    },
  );

  const value = useMemo<IGameStateContext>(
    () => ({
      dispatch,
      state,
    }),
    [state],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const Provider = GameStateContextProvider;

export function useGameStateContext(): IGameStateContext {
  return useContextOrThrow(Context);
}
