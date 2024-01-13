import { useEffect, useRef } from "react";
import { Nullable } from "../types/Nullable";

export function usePrevious<T>(value: T): Nullable<T> {
  const ref = useRef<Nullable<T>>(null);

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
