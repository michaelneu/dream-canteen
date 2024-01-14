import React from "react";
import { exhaustiveSwitchCase } from "../lib/exhaustiveSwitchCase";
import { useGameStateContext } from "../contexts/GameStateContext";
import { ActionType } from "../contexts/state/ActionType";
import { useWindowFocus } from "../hooks/useWindowFocus";
import { noop } from "../lib/noop";
import { FullScreenMenu } from "./FullScreenMenu";
import { MonospaceText } from "./primitives/MonospaceText";

enum PauseOptions {
  Resume,
  Restart,
  ExitToMenu,
}

const OPTIONS = [
  {
    label: "Resume",
    value: PauseOptions.Resume,
  },
  {
    label: "Restart",
    value: PauseOptions.Restart,
  },
  {
    label: "Exit To Menu",
    value: PauseOptions.ExitToMenu,
  },
];

interface IProps {
  onExitToMainMenu: () => void;
  onRestart: () => void;
}

export function PauseMenu({ onExitToMainMenu, onRestart }: IProps) {
  const {
    state: { pause },
    dispatch,
  } = useGameStateContext();

  function unpause() {
    dispatch({
      data: null,
      type: ActionType.UnpauseGame,
    });
  }

  useWindowFocus({
    onBlur: () => {
      dispatch({
        data: null,
        type: ActionType.PauseGame,
      });
    },
    onFocus: noop,
  });

  if (pause == null) {
    return null;
  }

  return (
    <FullScreenMenu
      header={
        <MonospaceText
          text="Paused"
          color="black"
          x={150}
          y={50}
          align="center"
          fontSize={32}
        />
      }
      headerHeight={100}
      options={OPTIONS}
      onSelectOption={(option) => {
        switch (option) {
          case PauseOptions.Resume:
            unpause();
            return;

          case PauseOptions.Restart:
            onRestart();
            return;

          case PauseOptions.ExitToMenu:
            onExitToMainMenu();
            return;

          default:
            throw exhaustiveSwitchCase(option);
        }
      }}
    />
  );
}
