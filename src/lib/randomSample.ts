import { invariant } from "./invariant";

export function randomSample<T>(array: readonly T[]): T {
  invariant(array.length > 0, "Cannot get sample from empty array");
  const index = Math.floor(Math.random() * array.length);
  return array[index];
}
