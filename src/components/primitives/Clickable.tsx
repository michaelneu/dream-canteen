import { Container } from "@pixi/react";
import React, { useRef } from "react";
import { FederatedPointerEvent } from "pixi.js";

interface IProps {
  x: number;
  y: number;
  children: React.ReactNode;
  onHover?: (event: FederatedPointerEvent) => void;
  onClick?: (event: FederatedPointerEvent) => void;
}

export function Clickable({ x, y, children, onHover, onClick }: IProps) {
  const didHoverRef = useRef(false);

  return (
    <Container
      cursor="pointer"
      x={x}
      y={y}
      interactive={true}
      pointerdown={(event) => {
        if (!didHoverRef.current) {
          return;
        }

        onClick?.(event);
      }}
      pointermove={(event) => {
        if (didHoverRef.current) {
          return;
        }

        didHoverRef.current = true;
        onHover?.(event);
      }}
      pointerout={() => {
        didHoverRef.current = false;
      }}
    >
      {children}
    </Container>
  );
}
