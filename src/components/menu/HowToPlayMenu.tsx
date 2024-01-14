import React from "react";
import { ImageAsset } from "../../config/ImageAsset";
import { FullScreenMenuWithBackToMainMenu } from "../menu/FullScreenMenuWithBackToMainMenu";
import { Sprite } from "../primitives/Sprite";
import { noop } from "../../lib/noop";
import { MonospaceText } from "../primitives/MonospaceText";

interface IProps {
  onBackToMainMenu: () => void;
}

export function HowToPlayMenu({ onBackToMainMenu }: IProps) {
  return (
    <FullScreenMenuWithBackToMainMenu
      headerHeight={500}
      header={
        <>
          <MonospaceText
            text="How To Play"
            fontSize={24}
            x={150}
            y={0}
            align="center"
            color="black"
          />

          <Sprite
            url={ImageAsset.HowToPlay}
            x={-60}
            y={20}
            width={500}
            height={500}
          />
        </>
      }
      options={[]}
      onBackToMainMenu={onBackToMainMenu}
      onSelectOption={noop}
    />
  );
}
