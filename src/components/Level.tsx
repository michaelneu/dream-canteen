import { useGameStateContext } from "../contexts/GameStateContext";
import { ActionType } from "../contexts/state/ActionType";
import { usePeriodicArgumentLessDispatch } from "../hooks/usePeriodicArgumentLessDispatch";
import { ONE_SECOND } from "../lib/Time";
import { TimeNumber } from "../types/Numbers";

export function Level() {
  const {
    state: {
      levelDescription,
      levelMap,
      ingredientsDrop: { droppedIngredients },
    },
  } = useGameStateContext();

  usePeriodicArgumentLessDispatch(
    [
      ActionType.DropIngredient,
      ActionType.CleanUpExpiredIngredients,
      ActionType.AddNewRandomRecipe,
    ],
    ONE_SECOND,
  );

  usePeriodicArgumentLessDispatch(
    [ActionType.IncreaseProgressBlocks],
    100 as TimeNumber,
  );

  return (
    <>
      {levelMap
        .getAllNonFreeBlocks()
        .map((block) => block.render(levelDescription))}

      {droppedIngredients
        .getDroppedIngredients()
        .map((ingredient) => ingredient.render(levelDescription))}
    </>
  );
}
