import { Container } from "@pixi/react";
import React from "react";
import { useGameStateContext } from "../contexts/GameStateContext";
import { BLOCK_SIZE } from "../config";
import { Floor } from "./sprites/Floor";
import { CenteredOnScreen } from "./CenteredOnScreen";
import { BlurContainer } from "./primitives/BlurContainer";
import { Timer } from "./Timer";
import { Score } from "./Score";

interface IProps {
  children: React.ReactNode;
}

export function GameArea({ children }: IProps) {
  const {
    state: {
      levelDescription,
      orders,
      levelMap,
      derived: { isGameRunning },
    },
  } = useGameStateContext();

  return (
    <BlurContainer x={0} y={0} blur={!isGameRunning ? 12 : 0}>
      <CenteredOnScreen
        width={levelMap.getColumns() * BLOCK_SIZE}
        height={(levelMap.getRows() + 1) * BLOCK_SIZE}
      >
        <Container x={0} y={BLOCK_SIZE}>
          <Floor />

          {children}
        </Container>

        <Container x={0} y={0}>
          {orders.render(levelDescription)}

          <Score
            x={(levelMap.getColumns() - 2.1) * BLOCK_SIZE}
            y={BLOCK_SIZE * 0.6}
          />

          <Timer
            x={(levelMap.getColumns() - 0.5) * BLOCK_SIZE}
            y={BLOCK_SIZE / 2}
          />
        </Container>
      </CenteredOnScreen>
    </BlurContainer>
  );
}
