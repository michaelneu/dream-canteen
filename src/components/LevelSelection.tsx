import { useMemo } from "react";
import { LevelDescription, LevelDescriptionID } from "../lib/LevelDescription";
import { FullScreenMenu } from "./FullScreenMenu";

interface IProps {
  levelDesciptions: readonly LevelDescription[];
  onSelectLevel: (id: LevelDescriptionID) => void;
}

export function LevelSelection({ levelDesciptions, onSelectLevel }: IProps) {
  const options = useMemo(() => {
    return levelDesciptions.map((levelDesciption) => ({
      label: levelDesciption.getName(),
      value: levelDesciption.getID(),
    }));
  }, [levelDesciptions]);

  return <FullScreenMenu options={options} onSelectOption={onSelectLevel} />;
}
