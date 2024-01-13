import { useTick } from "@pixi/react";
import { useEffect, useState } from "react";
import { TimeNumber } from "../types/Numbers";
import { useGameStateContext } from "../contexts/GameStateContext";
import { currentTime } from "../lib/currentTime";

export function useTimeout(fn: () => void, ms: TimeNumber): void {
  const {
    state: {
      derived: { isGameRunning },
    },
  } = useGameStateContext();

  const [startTime, setStartTime] = useState(currentTime);

  useEffect(() => {
    setStartTime(currentTime());
  }, [ms]);

  const isEnabled = ms !== 0 && startTime != null && isGameRunning;

  useTick(() => {
    if (startTime == null) {
      return;
    }

    if (currentTime() > startTime + ms) {
      fn();
    }
  }, isEnabled);
}
