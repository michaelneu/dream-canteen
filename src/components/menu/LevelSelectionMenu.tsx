import { useMemo } from "react";
import {
  LevelDescription,
  LevelDescriptionID,
} from "../../lib/LevelDescription";
import { ImageAsset } from "../../config/ImageAsset";
import { Sprite } from "../primitives/Sprite";
import { FullScreenMenuWithBackToMainMenu } from "./FullScreenMenuWithBackToMainMenu";

interface IProps {
  levelDesciptions: readonly LevelDescription[];
  onSelectLevel: (id: LevelDescriptionID) => void;
  onBackToMainMenu: () => void;
}

export function LevelSelectionMenu({
  levelDesciptions,
  onSelectLevel,
  onBackToMainMenu,
}: IProps) {
  const options = useMemo(() => {
    return levelDesciptions.map((levelDescription) => ({
      label: levelDescription.getName(),
      value: levelDescription.getID(),
    }));
  }, [levelDesciptions]);

  return (
    <FullScreenMenuWithBackToMainMenu
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
      options={options}
      onBackToMainMenu={onBackToMainMenu}
      onSelectOption={onSelectLevel}
    />
  );
}
