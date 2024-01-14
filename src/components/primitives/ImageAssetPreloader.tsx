import React from "react";
import { ImageAsset } from "../../config/ImageAsset";
import { Sprite } from "./Sprite";

const ASSETS = Array.from(Object.values(ImageAsset)).filter((value) =>
  String(value).includes("/"),
);

export function ImageAssetPreloader() {
  return (
    <>
      {ASSETS.map((asset) => (
        <Sprite
          key={String(asset)}
          x={-1000}
          y={-1000}
          width={0}
          height={0}
          url={asset}
        />
      ))}
    </>
  );
}
