import { exhaustiveSwitchCase } from "../lib/exhaustiveSwitchCase";
import { useGameStateContext } from "../contexts/GameStateContext";
import { FullScreenMenu } from "./FullScreenMenu";
import { MonospaceText } from "./primitives/MonospaceText";

enum MenuOptions {
  Restart,
  ExitToMenu,
}

const OPTIONS = [
  {
    label: "Restart",
    value: MenuOptions.Restart,
  },
  {
    label: "Exit To Menu",
    value: MenuOptions.ExitToMenu,
  },
];

interface IProps {
  onExitToMainMenu: () => void;
  onRestart: () => void;
}

export function GameOverMenu({ onExitToMainMenu, onRestart }: IProps) {
  const {
    state: {
      pause,
      derived: { isGameRunning },
    },
  } = useGameStateContext();

  if (isGameRunning || pause != null) {
    return null;
  }

  return (
    <FullScreenMenu
      header={
        <MonospaceText
          text="Time's Up!"
          color="black"
          x={150}
          y={50}
          align="center"
          fontSize={32}
        />
      }
      headerHeight={100}
      backdropOpacity={0.9}
      options={OPTIONS}
      onSelectOption={(option) => {
        switch (option) {
          case MenuOptions.Restart:
            onRestart();
            return;

          case MenuOptions.ExitToMenu:
            onExitToMainMenu();
            return;

          default:
            throw exhaustiveSwitchCase(option);
        }
      }}
    />
  );
}
