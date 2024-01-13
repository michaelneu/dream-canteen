import { invariant } from "./invariant";

export function randomArrayIndex<T>(array: readonly T[]): number {
  invariant(array.length > 0, "Cannot get index of empty array");
  return Math.floor(array.length * Math.random());
}
