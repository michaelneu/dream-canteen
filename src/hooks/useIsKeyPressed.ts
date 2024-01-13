import { useState } from "react";
import { Keys } from "../lib/Keys";
import { useKeyDown } from "./useKeyDown";
import { useKeyUp } from "./useKeyUp";

export function useIsKeyPressed(key: Keys): boolean {
  const [isPressed, setIsPressed] = useState(false);

  useKeyDown(key, () => {
    setIsPressed(true);
  });

  useKeyUp(key, () => {
    setIsPressed(false);
  });

  return isPressed;
}
