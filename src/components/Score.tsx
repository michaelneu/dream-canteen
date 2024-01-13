import { useGameStateContext } from "../contexts/GameStateContext";
import { MonospaceText } from "./primitives/MonospaceText";
import { Group } from "./primitives/Group";
import { ScoreToast } from "./ScoreToast";

interface IProps {
  x: number;
  y: number;
}

export function Score({ x, y }: IProps) {
  const {
    state: { score, scoreToast },
  } = useGameStateContext();

  return (
    <Group x={x} y={y}>
      <MonospaceText
        x={0}
        y={0}
        align="right"
        fontSize={32}
        text={score.toFixed(0)}
        color="white"
      />

      <MonospaceText
        x={0}
        y={30}
        align="right"
        fontSize={26}
        text="Score"
        color="#ccc"
      />

      {scoreToast != null ? (
        <ScoreToast
          key={scoreToast.key}
          color={scoreToast.color}
          x={0}
          sourceY={-10}
          destinationY={-50}
          label={scoreToast.text}
        />
      ) : null}
    </Group>
  );
}
