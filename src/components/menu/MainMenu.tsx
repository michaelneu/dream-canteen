import { useState } from "react";
import React from "react";
import {
  LevelDescription,
  LevelDescriptionID,
} from "../../lib/LevelDescription";
import { ImageAsset } from "../../config/ImageAsset";
import { exhaustiveSwitchCase } from "../../lib/exhaustiveSwitchCase";
import { FullScreenMenu } from "../FullScreenMenu";
import { FallingIngredients } from "../FallingIngredients";
import { Sprite } from "../primitives/Sprite";
import { LevelSelectionMenu } from "./LevelSelectionMenu";
import { HowToPlayMenu } from "./HowToPlayMenu";
import { RecipesMenu } from "./RecipesMenu";

enum MenuScreen {
  MainMenu,
  LevelSelection,
  HowToPlay,
  Recipes,
}

const MAIN_MENU_OPTIONS = [
  {
    label: "Levels",
    value: MenuScreen.LevelSelection,
  },
  {
    label: "Recipes",
    value: MenuScreen.Recipes,
  },
  {
    label: "How To Play",
    value: MenuScreen.HowToPlay,
  },
];

interface IProps {
  levelDesciptions: readonly LevelDescription[];
  onSelectLevel: (id: LevelDescriptionID) => void;
}

export function MainMenu({ levelDesciptions, onSelectLevel }: IProps) {
  const [menuScreen, setMenuScreen] = useState(MenuScreen.MainMenu);
  function handleBackToMainMenu() {
    setMenuScreen(MenuScreen.MainMenu);
  }

  let menu: React.ReactNode = null;

  switch (menuScreen) {
    case MenuScreen.MainMenu:
      menu = (
        <FullScreenMenu
          headerHeight={200}
          header={
            <Sprite
              url={ImageAsset.MenuLogo}
              x={-60}
              y={-40}
              width={400}
              height={400}
            />
          }
          options={MAIN_MENU_OPTIONS}
          onSelectOption={setMenuScreen}
        />
      );
      break;

    case MenuScreen.LevelSelection:
      menu = (
        <LevelSelectionMenu
          levelDesciptions={levelDesciptions}
          onSelectLevel={onSelectLevel}
          onBackToMainMenu={handleBackToMainMenu}
        />
      );
      break;

    case MenuScreen.HowToPlay:
      menu = <HowToPlayMenu onBackToMainMenu={handleBackToMainMenu} />;
      break;

    case MenuScreen.Recipes:
      menu = <RecipesMenu onBackToMainMenu={handleBackToMainMenu} />;
      break;

    default:
      throw exhaustiveSwitchCase(menuScreen);
  }

  return (
    <>
      <FallingIngredients />
      {menu}
    </>
  );
}
