import { useScreenSizeContext } from "../../contexts/ScreenSizeContext";
import { TilingSprite } from "../primitives/TilingSprite";

export function Noise() {
  const { width, height } = useScreenSizeContext();

  return (
    <TilingSprite
      x={0}
      y={0}
      width={width}
      height={height}
      url="assets/noise.png"
    />
  );
}
