import { useTick } from "@pixi/react";
import { useRef } from "react";
import { Nullable } from "../types/Nullable";
import { TimeNumber, Timestamp } from "../types/Numbers";
import { currentTime } from "../lib/currentTime";

export function useInterval(fn: () => void, ms: TimeNumber): void {
  const isEnabled = ms !== 0;
  const previousTimeRef = useRef<Nullable<Timestamp>>(null);
  useTick(() => {
    const now = currentTime();

    if (previousTimeRef.current == null) {
      previousTimeRef.current = now;
    }

    const timeSinceLastRun = now - previousTimeRef.current;

    if (timeSinceLastRun < ms) {
      return;
    }

    previousTimeRef.current = now;
    fn();
  }, isEnabled);
}

export const INTERVAL_DISABLED = 0 as TimeNumber;
