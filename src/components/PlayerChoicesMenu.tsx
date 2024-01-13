import { useMemo } from "react";
import { useGameStateContext } from "../contexts/GameStateContext";
import { ActionType } from "../contexts/state/ActionType";
import { Food } from "../lib/Food";
import { SelectedChoicesMenu } from "../lib/SelectedChoicesMenu";
import { AbilityType } from "../lib/AbilityType";
import { Ability } from "../lib/Ability";
import { exhaustiveSwitchCase } from "../lib/exhaustiveSwitchCase";
import { ChoicesMenu } from "./ChoicesMenu";

const ABILITY_CHOICES = Object.values(AbilityType).map(
  (type) => new Ability(type),
);

export function PlayerChoicesMenu() {
  const {
    dispatch,
    state: {
      levelDescription,
      player: {
        boundingBox,
        selectedChoicesMenu,
        backpack: { items: backpackItems },
      },
      derived: {
        player: { lookedAtBlock },
      },
    },
  } = useGameStateContext();

  const supplyStationChoices = useMemo(
    () =>
      levelDescription
        .getSupplyStationChoices()
        .map((ingredient) => new Food(ingredient)),
    [levelDescription],
  );

  if (selectedChoicesMenu == null) {
    return null;
  }

  switch (selectedChoicesMenu) {
    case SelectedChoicesMenu.Supplies:
      if (lookedAtBlock == null) {
        return null;
      }
      return (
        <ChoicesMenu
          choices={supplyStationChoices}
          boundingBox={lookedAtBlock.getBoundingBox()}
          onChoice={(food) => {
            dispatch({
              data: {
                ingredient: food.getIngredient(),
              },
              type: ActionType.StartIngredientDrop,
            });
          }}
          onHide={() => {
            dispatch({
              data: null,
              type: ActionType.HideCurrentChoicesMenu,
            });
          }}
        />
      );

    case SelectedChoicesMenu.Abilities:
      if (lookedAtBlock == null) {
        return null;
      }
      return (
        <ChoicesMenu
          choices={ABILITY_CHOICES}
          boundingBox={lookedAtBlock.getBoundingBox()}
          onChoice={(ability) => {
            dispatch({
              data: {
                ability: ability.getType(),
              },
              type: ActionType.SelectAbility,
            });
          }}
          onHide={() => {
            dispatch({
              data: null,
              type: ActionType.HideCurrentChoicesMenu,
            });
          }}
        />
      );

    case SelectedChoicesMenu.Backpack:
      return (
        <ChoicesMenu
          choices={backpackItems}
          boundingBox={boundingBox}
          onChoice={(item) => {
            dispatch({
              data: {
                item,
              },
              type: ActionType.ReplaceBackpackItem,
            });
          }}
          onHide={() => {
            dispatch({
              data: null,
              type: ActionType.HideCurrentChoicesMenu,
            });
          }}
        />
      );

    default:
      throw exhaustiveSwitchCase(selectedChoicesMenu);
  }
}
