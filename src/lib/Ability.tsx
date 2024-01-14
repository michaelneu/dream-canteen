import { MonospaceText } from "../components/primitives/MonospaceText";
import { BlockSizedSprite } from "../components/sprites/BlockSizedSprite";
import { ImageAsset } from "../config/ImageAsset";
import { IRenderable } from "../types/IRenderable";
import { AbilityType } from "./AbilityType";
import { exhaustiveSwitchCase } from "./exhaustiveSwitchCase";

export class Ability implements IRenderable {
  private readonly type: AbilityType;

  constructor(type: AbilityType) {
    this.type = type;
  }

  getType(): AbilityType {
    return this.type;
  }

  render(): React.ReactNode {
    const textProps = {
      fontSize: 96,
      x: 0,
      y: 0,
    };

    switch (this.type) {
      case AbilityType.AutoPrepareIngredients:
        return <MonospaceText {...textProps} text="🔪" />;

      case AbilityType.Backpack:
        return <MonospaceText {...textProps} text="🎒" />;

      case AbilityType.MoveFast:
        return <BlockSizedSprite x={0} y={0} url={ImageAsset.SpeedCloak} />;

      case AbilityType.NoClip:
        return <MonospaceText {...textProps} text="🫥" />;

      case AbilityType.ProgressStationAssistant:
        return <MonospaceText {...textProps} text="🤖" />;

      default:
        throw exhaustiveSwitchCase(this.type);
    }
  }
}
