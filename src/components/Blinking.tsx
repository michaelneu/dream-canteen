import { useState } from "react";
import { useIntervalDuringGame } from "../hooks/useIntervalDuringGame";
import { TimeNumber } from "../types/Numbers";

interface IProps {
  children: React.ReactNode;
}

export function Blinking({ children }: IProps) {
  const [isVisible, setIsVisible] = useState(true);

  useIntervalDuringGame(() => {
    setIsVisible((value) => !value);
  }, 250 as TimeNumber);

  if (isVisible) {
    return <>{children}</>;
  }

  return null;
}
