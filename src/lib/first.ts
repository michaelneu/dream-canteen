import { Nullable } from "../types/Nullable";

export function first<T>(array: readonly T[]): Nullable<T> {
  if (array.length > 0) {
    return array[0];
  }

  return null;
}
