import { useMemo } from "react";
import { useScreenSizeContext } from "../contexts/ScreenSizeContext";

interface IOutput {
  width: number;
  height: number;
  scaleFactor: number;
}

export function useScaledUpBasedOnScreenSize(
  width: number,
  height: number,
): IOutput {
  const { width: screenWidth, height: screenHeight } = useScreenSizeContext();

  return useMemo<IOutput>(() => {
    let scaledWidth = width;
    let scaledHeight = height;

    if (scaledWidth < screenWidth) {
      const scaleUpFactor = screenWidth / scaledWidth;
      scaledWidth *= scaleUpFactor;
      scaledHeight *= scaleUpFactor;
    }

    if (scaledHeight < screenHeight) {
      const scaleUpFactor = screenHeight / scaledHeight;
      scaledWidth *= scaleUpFactor;
      scaledHeight *= scaleUpFactor;
    }

    return {
      height: scaledHeight,
      scaleFactor: scaledWidth / width,
      width: scaledWidth,
    };
  }, [height, screenHeight, screenWidth, width]);
}
