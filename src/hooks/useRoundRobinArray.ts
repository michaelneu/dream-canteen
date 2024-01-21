import { useCallback, useEffect, useReducer } from "react";
import { invariant } from "../lib/invariant";

interface IRoundRobinState<T> {
  array: readonly T[];
  index: number;
}

enum Action {
  UpdateArray,
  NextItem,
}

type Actions<T> =
  | {
      type: Action.NextItem;
    }
  | {
      type: Action.UpdateArray;
      array: readonly T[];
    };

function reducer<T>(
  state: IRoundRobinState<T>,
  action: Actions<T>,
): IRoundRobinState<T> {
  switch (action.type) {
    case Action.NextItem:
      return {
        ...state,
        index: (state.index + 1) % state.array.length,
      };

    case Action.UpdateArray:
      if (action.array === state.array) {
        return state;
      }

      return {
        ...state,
        array: action.array,
        index: 0,
      };
  }
}

export function useRoundRobinArray<T>(
  arrayFromProps: readonly T[],
): [T, () => void] {
  const [{ array, index }, dispatch] = useReducer(reducer, {
    array: arrayFromProps,
    index: 0,
  });

  useEffect(() => {
    dispatch({
      array: arrayFromProps,
      type: Action.UpdateArray,
    });
  }, [arrayFromProps]);

  const next = useCallback(() => {
    dispatch({ type: Action.NextItem });
  }, []);

  invariant(
    index < array.length,
    `Out of bounds, index is ${index} for [${array.join(", ")}]`,
  );

  return [array[index] as T, next];
}
