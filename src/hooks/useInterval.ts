import { useTick } from "@pixi/react";
import { useRef } from "react";
import { Nullable } from "../types/Nullable";
import { TimeNumber, Timestamp } from "../types/Numbers";
import { currentTime } from "../lib/currentTime";
import { useIsWindowActive } from "./useIsWindowActive";

export function useInterval(fn: () => void, ms: TimeNumber): void {
  const isWindowActive = useIsWindowActive();
  const isEnabled = ms !== 0 && isWindowActive;
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
