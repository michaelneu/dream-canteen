import React, { useMemo, useState } from "react";
import { useContextOrThrow } from "../hooks/useContextOrThrow";
import { Nullable } from "../types/Nullable";
import { useEventListener } from "../hooks/useEventListener";

interface IScreenSizeContext {
  width: number;
  height: number;
}

const Context = React.createContext<Nullable<IScreenSizeContext>>(null);
Context.displayName = "ScreenSizeContext";

interface IProps {
  children: React.ReactNode;
}

function ScreenSizeContextProvider({ children }: IProps) {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEventListener("resize", () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  const value = useMemo<IScreenSizeContext>(() => {
    return {
      height,
      width,
    };
  }, [width, height]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const Provider = ScreenSizeContextProvider;

export function useScreenSizeContext(): IScreenSizeContext {
  return useContextOrThrow(Context);
}
