import { useMemo } from "react";
import { useScreenSizeContext } from "../contexts/ScreenSizeContext";

interface IOutput {
  width: number;
  height: number;
  scaleFactor: number;
}

export function useScaledDownBasedOnScreenSize(
  width: number,
  height: number,
): IOutput {
  const { width: screenWidth, height: screenHeight } = useScreenSizeContext();

  return useMemo<IOutput>(() => {
    let scaledWidth = width;
    let scaledHeight = height;

    if (scaledWidth > screenWidth) {
      const scaleDownFactor = screenWidth / scaledWidth;
      scaledWidth *= scaleDownFactor;
      scaledHeight *= scaleDownFactor;
    }

    if (scaledHeight > screenHeight) {
      const scaleDownFactor = screenHeight / scaledHeight;
      scaledWidth *= scaleDownFactor;
      scaledHeight *= scaleDownFactor;
    }

    return {
      height: scaledHeight,
      scaleFactor: scaledWidth / width,
      width: scaledWidth,
    };
  }, [height, screenHeight, screenWidth, width]);
}
