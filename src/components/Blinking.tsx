import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import { TimeNumber } from "../types/Numbers";

interface IProps {
  children: React.ReactNode;
}

export function Blinking({ children }: IProps) {
  const [isVisible, setIsVisible] = useState(true);

  useInterval(() => {
    setIsVisible((value) => !value);
  }, 250 as TimeNumber);

  if (isVisible) {
    return <>{children}</>;
  }

  return null;
}
