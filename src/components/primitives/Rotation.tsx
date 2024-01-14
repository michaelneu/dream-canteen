import { Container } from "@pixi/react";
import React from "react";

interface IProps {
  x: number;
  y: number;
  rotation: number;
  children: React.ReactNode;
}

export function Rotation({ x, y, rotation, children }: IProps) {
  return (
    <Container x={x} y={y} anchor={0.5} rotation={rotation}>
      {children}
    </Container>
  );
}
