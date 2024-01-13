import { useState } from "react";
import { useTimeout } from "../hooks/useTimeout";
import { TimeNumber } from "../types/Numbers";
import { Blinking } from "./Blinking";

interface IProps {
  children: React.ReactNode;
  delayMS: TimeNumber;
}

export function BlinkingAfter({ children, delayMS }: IProps) {
  const [didDelayPass, setDidDelayPass] = useState(false);

  useTimeout(() => {
    setDidDelayPass(true);
  }, delayMS);

  if (didDelayPass) {
    return <Blinking>{children}</Blinking>;
  }

  return <>{children}</>;
}
