import { BlockSizedGroupWithBorder } from "../components/BlockSizedGroupWithBorder";
import { Group } from "../components/primitives/Group";
import { BlockSizedSprite } from "../components/sprites/BlockSizedSprite";
import { BLOCK_SIZE, MAX_INGREDIENTS_PER_RECIPE } from "../config";
import { ImageAsset } from "../config/ImageAsset";
import { IRecipe } from "../types/IRecipe";
import { IRenderable } from "../types/IRenderable";
import { IWithID } from "../types/IWithID";
import { Opaque } from "../types/OpaqueType";
import { Food } from "./Food";
import { LevelDescription } from "./LevelDescription";
import { getRawIngredient } from "./getRawIngredient";

const INGREDIENTS_SCALE = 1 / MAX_INGREDIENTS_PER_RECIPE;

type FoodOrderID = Opaque<string, "FoodOrderID">;

export class FoodOrder implements IRenderable, IWithID<FoodOrderID> {
  private readonly recipe: IRecipe;

  constructor(recipe: IRecipe) {
    this.recipe = recipe;
  }

  getID(): FoodOrderID {
    const recipe = this.getRecipe();
    return `${recipe.label}-${Array.from(recipe.ingredients).join(
      "-",
    )}` as FoodOrderID;
  }

  getRecipe(): IRecipe {
    return this.recipe;
  }

  render(levelDescription: LevelDescription): React.ReactNode {
    const recipe = this.getRecipe();

    return (
      <BlockSizedGroupWithBorder x={0} y={0} borderColor="#333">
        {Array.from(recipe.ingredients).map((ingredient, index) => (
          <Group
            key={ingredient}
            x={index * BLOCK_SIZE * INGREDIENTS_SCALE}
            y={0}
            scale={INGREDIENTS_SCALE}
          >
            {new Food(getRawIngredient(ingredient, levelDescription)).render(
              levelDescription,
            )}
          </Group>
        ))}

        <Group
          x={BLOCK_SIZE * INGREDIENTS_SCALE}
          y={BLOCK_SIZE * INGREDIENTS_SCALE}
          scale={1 - INGREDIENTS_SCALE}
        >
          <BlockSizedSprite x={0} y={0} url={recipe.result as ImageAsset} />
        </Group>
      </BlockSizedGroupWithBorder>
    );
  }
}
