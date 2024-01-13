import { useCallback, useState } from "react";
import { invariant } from "../lib/invariant";
import { usePrevious } from "./usePrevious";

export function useRoundRobinArray<T>(array: readonly T[]): [T, () => void] {
  const [index, setIndex] = useState(0);
  const previousArray = usePrevious(array);
  const autoResetIndex =
    previousArray != null && previousArray !== array ? 0 : index;

  const next = useCallback(
    () => setIndex((autoResetIndex + 1) % array.length),
    [array.length, autoResetIndex],
  );

  invariant(autoResetIndex < array.length, "Out of bounds");
  return [array[autoResetIndex], next];
}
