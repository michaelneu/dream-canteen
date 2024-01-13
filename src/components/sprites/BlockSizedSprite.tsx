import { BLOCK_SIZE } from "../../config";
import { ImageAsset } from "../../config/ImageAsset";
import { Sprite } from "../primitives/Sprite";

interface IProps {
  x: number;
  y: number;
  url: ImageAsset;
}

export function BlockSizedSprite({ x, y, url }: IProps) {
  return (
    <Sprite width={BLOCK_SIZE} height={BLOCK_SIZE} x={x} y={y} url={url} />
  );
}
