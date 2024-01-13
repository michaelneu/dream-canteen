import { first } from "./first";
import { invariant } from "./invariant";

export function firstx<T>(array: readonly T[]): T {
  const value = first(array);
  invariant(value != null, "Expected to have at least one array item");
  return value as NonNullable<T>;
}
