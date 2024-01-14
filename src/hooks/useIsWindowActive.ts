import { useState } from "react";
import { useWindowFocus } from "./useWindowFocus";

export function useIsWindowActive(): boolean {
  const [isActive, setIsActive] = useState(true);

  useWindowFocus({
    onBlur: () => setIsActive(false),
    onFocus: () => setIsActive(true),
  });

  return isActive;
}
