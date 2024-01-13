import { MonospaceText } from "../components/primitives/MonospaceText";
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
    return <MonospaceText x={0} y={0} text={this.getEmoji()} fontSize={96} />;
  }

  private getEmoji(): string {
    switch (this.type) {
      case AbilityType.AutoPrepareIngredients:
        return "🔪";

      case AbilityType.Backpack:
        return "🎒";

      case AbilityType.MoveFast:
        return "💨";

      case AbilityType.NoClip:
        return "🫥";

      case AbilityType.ProgressStationAssistant:
        return "🤖";

      default:
        throw exhaustiveSwitchCase(this.type);
    }
  }
}
