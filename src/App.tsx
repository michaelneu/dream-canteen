import { Stage } from "@pixi/react";
import * as ScreenSizeContext from "./contexts/ScreenSizeContext";
import { useScreenSizeContext } from "./contexts/ScreenSizeContext";
import { Game } from "./components/Game";
import { ImageAssetPreloader } from "./components/primitives/ImageAssetPreloader";

function AppInternal() {
  const { width, height } = useScreenSizeContext();

  return (
    <Stage
      width={width}
      height={height}
      options={{
        backgroundColor: 0xffffff,
      }}
    >
      <ScreenSizeContext.Provider>
        <ImageAssetPreloader />
        <Game />
      </ScreenSizeContext.Provider>
    </Stage>
  );
}

export function App() {
  return (
    <ScreenSizeContext.Provider>
      <AppInternal />
    </ScreenSizeContext.Provider>
  );
}
