import { Container, useTick } from "@pixi/react";
import { useRef, useState } from "react";
import { Nullable } from "../types/Nullable";
import { currentTime } from "../lib/currentTime";
import { Timestamp } from "../types/Numbers";
import { MonospaceText } from "./primitives/MonospaceText";
import { Rectangle } from "./primitives/Rectangle";

const UPDATE_INTERVAL = 50;

export function FPSCounter() {
  const [fps, setFPS] = useState(0);
  const previousUpdateTimeRef = useRef<Nullable<Timestamp>>(null);

  useTick((_delta, ticker) => {
    const now = currentTime();

    if (previousUpdateTimeRef.current == null) {
      previousUpdateTimeRef.current = now;
    }

    if (now - previousUpdateTimeRef.current < UPDATE_INTERVAL) {
      return;
    }

    setFPS(ticker.FPS);
    previousUpdateTimeRef.current = now;
  });

  return (
    <Container>
      <Rectangle
        x={0}
        y={0}
        width={90}
        height={35}
        color="rgba(0, 0, 0, 0.3)"
      />

      <MonospaceText
        text={`${fps.toFixed(1)} FPS`}
        x={10}
        y={10}
        fontSize={14}
      />
    </Container>
  );
}
