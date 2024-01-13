export function invariant(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new InvariantViolationException(message);
  }
}

export class InvariantViolationException extends Error {}
