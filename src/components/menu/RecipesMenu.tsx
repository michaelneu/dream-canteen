import React from "react";
import { ImageAsset } from "../../config/ImageAsset";
import { FullScreenMenuWithBackToMainMenu } from "../menu/FullScreenMenuWithBackToMainMenu";
import { Sprite } from "../primitives/Sprite";
import { useRoundRobinArray } from "../../hooks/useRoundRobinArray";
import { MonospaceText } from "../primitives/MonospaceText";

const RECIPES = [
  ImageAsset.RecipeBlueberryJelly,
  ImageAsset.RecipeStrawberryJelly,
  ImageAsset.RecipeEggFriedRice,
];

const OPTIONS = [
  {
    label: "Next Recipe",
    value: Symbol(),
  },
];

interface IProps {
  onBackToMainMenu: () => void;
}

export function RecipesMenu({ onBackToMainMenu }: IProps) {
  const [recipeAsset, nextRecipe] = useRoundRobinArray(RECIPES);

  return (
    <FullScreenMenuWithBackToMainMenu
      headerHeight={450}
      header={
        <>
          <MonospaceText
            text={`Recipe ${RECIPES.indexOf(recipeAsset) + 1} of ${
              RECIPES.length
            }`}
            fontSize={24}
            x={150}
            y={0}
            align="center"
            color="black"
          />

          <Sprite url={recipeAsset} width={400} height={400} x={-50} y={25} />
        </>
      }
      options={OPTIONS}
      onBackToMainMenu={onBackToMainMenu}
      onSelectOption={() => {
        nextRecipe();
      }}
    />
  );
}
