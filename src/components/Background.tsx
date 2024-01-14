import { useScreenSizeContext } from "../contexts/ScreenSizeContext";
import { useScaledUpBasedOnScreenSize } from "../hooks/useScaleUpBasedOnScreenSize";
import { ImageAsset } from "../config/ImageAsset";
import { Sprite } from "./primitives/Sprite";

const ASSET_WIDTH = 1920;
const ASSET_HEIGHT = 1080;

export function Background() {
  const { width: screenWidth, height: screenHeight } = useScreenSizeContext();
  const { width, height } = useScaledUpBasedOnScreenSize(
    ASSET_WIDTH,
    ASSET_HEIGHT,
  );

  return (
    <Sprite
      x={(screenWidth - width) / 2}
      y={(screenHeight - height) / 2}
      width={width}
      height={height}
      url={ImageAsset.Background}
    />
  );
}
