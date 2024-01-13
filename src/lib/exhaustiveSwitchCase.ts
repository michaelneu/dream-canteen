import { InvariantViolationException } from "./invariant";

export function exhaustiveSwitchCase(value: never) {
  return new InvariantViolationException(`Unexpected case: ${value}`);
}
