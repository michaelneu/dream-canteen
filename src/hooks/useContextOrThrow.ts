import React, { useContext } from "react";
import { invariant } from "../lib/invariant";

export function useContextOrThrow<T>(
  context: React.Context<T>,
): NonNullable<T> {
  const value = useContext(context);
  invariant(value != null, `${context.displayName ?? context} was null`);
  return value;
}
