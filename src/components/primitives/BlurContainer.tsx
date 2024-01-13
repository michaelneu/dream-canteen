import { Container } from "@pixi/react";
import * as PIXIJS from "pixi.js";
import React, { useMemo } from "react";

interface IProps {
  blur: number;
  children: React.ReactNode;
  x: number;
  y: number;
}

export function BlurContainer({ blur, children, x, y }: IProps) {
  const filters = useMemo(
    () => (blur === 0 ? [] : [new PIXIJS.BlurFilter(blur, 20)]),
    [blur],
  );

  return (
    <Container x={x} y={y} filters={filters}>
      {children}
    </Container>
  );
}
