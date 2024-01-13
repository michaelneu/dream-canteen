import { Container } from "@pixi/react";
import React from "react";
import { useScaledDownBasedOnScreenSize } from "../hooks/useScaledDownBasedOnScreenSize";
import { SCREEN_AREA_UNDERSCALE } from "../config";
import { useScreenSizeContext } from "../contexts/ScreenSizeContext";

interface IProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

export function CenteredOnScreen({ width, height, children }: IProps) {
  const {
    scaleFactor,
    width: scaledWidth,
    height: scaledHeight,
  } = useScaledDownBasedOnScreenSize(width, height);

  const underscaledScaleFactor = scaleFactor * SCREEN_AREA_UNDERSCALE;
  const underscaledScaledWidth = scaledWidth * SCREEN_AREA_UNDERSCALE;
  const underscaledScaledHeight = scaledHeight * SCREEN_AREA_UNDERSCALE;

  const { width: screenWidth, height: screenHeight } = useScreenSizeContext();

  const offsetX = (screenWidth - underscaledScaledWidth) / 2;
  const offsetY = (screenHeight - underscaledScaledHeight) / 2;

  return (
    <Container x={offsetX} y={offsetY} scale={underscaledScaleFactor}>
      {children}
    </Container>
  );
}
