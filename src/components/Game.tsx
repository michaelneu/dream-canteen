import { useMemo, useState } from "react";
import * as GameStateContext from "../contexts/GameStateContext";
import { LEVELS } from "../config/levels";
import { Nullable } from "../types/Nullable";
import { LevelDescriptionID } from "../lib/LevelDescription";
import { IS_DEBUG_ENABLED } from "../config";
import { GameArea } from "./GameArea";
import { Player } from "./Player";
import { FPSCounter } from "./FPSCounter";
import { Level } from "./Level";
import { Background } from "./Background";
import { Noise } from "./sprites/Noise";
import { MainMenu } from "./menu/MainMenu";
import { PauseMenu } from "./PauseMenu";
import { GameOverMenu } from "./GameOverMenu";

export function Game() {
  const [selectedLevelID, setSelectedLevelID] =
    useState<Nullable<LevelDescriptionID>>(null);

  const [restartKey, setRestartKey] = useState(0);
  const selectedLevel = useMemo(
    () => LEVELS.find((level) => level.getID() === selectedLevelID),
    [selectedLevelID],
  );

  if (selectedLevel == null) {
    return (
      <MainMenu levelDesciptions={LEVELS} onSelectLevel={setSelectedLevelID} />
    );
  }

  function handleExitToMainMenu() {
    setSelectedLevelID(null);
  }

  function handleRestart() {
    setRestartKey((value) => value + 1);
  }

  return (
    <GameStateContext.Provider
      key={selectedLevel.getID() + restartKey}
      level={selectedLevel}
    >
      <Background />
      {IS_DEBUG_ENABLED ? <FPSCounter /> : null}

      <GameArea>
        <Level />

        <Player />
      </GameArea>

      <Noise />

      <PauseMenu
        onExitToMainMenu={handleExitToMainMenu}
        onRestart={handleRestart}
      />

      <GameOverMenu
        onExitToMainMenu={handleExitToMainMenu}
        onRestart={handleRestart}
      />
    </GameStateContext.Provider>
  );
}
