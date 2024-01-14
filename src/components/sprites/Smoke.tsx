import { useMemo } from "react";
import { ImageAsset } from "../../config/ImageAsset";
import { useRoundRobinArray } from "../../hooks/useRoundRobinArray";
import { useIntervalDuringGame } from "../../hooks/useIntervalDuringGame";
import { ONE_SECOND } from "../../lib/Time";
import { TimeNumber } from "../../types/Numbers";
import { Sprite } from "../primitives/Sprite";
import { BLOCK_SIZE } from "../../config";
import { range } from "../../lib/range";
import { shuffleArray } from "../../lib/shuffleArray";
import { randomArrayIndex } from "../../lib/randomArrayIndex";

const SPRITES = [ImageAsset.Smoke1, ImageAsset.Smoke2, ImageAsset.Smoke3];
const SHUFFLED_SPRITES = range(0, 3).map(() => shuffleArray(SPRITES));

interface IProps {
  x: number;
  y: number;
}

export function Smoke({ x, y }: IProps) {
  const sprites = useMemo(
    () => SHUFFLED_SPRITES[randomArrayIndex(SHUFFLED_SPRITES)],
    [],
  );

  const [sprite, nextSprite] = useRoundRobinArray(sprites);

  useIntervalDuringGame(
    () => {
      nextSprite();
    },
    (0.1 * ONE_SECOND) as TimeNumber,
  );

  return (
    <Sprite x={x} y={y} width={BLOCK_SIZE} height={BLOCK_SIZE} url={sprite} />
  );
}
