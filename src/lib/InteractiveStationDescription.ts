import {
  IngredientTransitions,
  InvertedIngredientTransitions,
} from "../types/IngredientTransitions";
import { invertMap } from "./invertMap";

export class InteractiveStationDescription {
  private transitions: IngredientTransitions;
  private invertedTransitions: InvertedIngredientTransitions;

  constructor(transitions: IngredientTransitions) {
    this.transitions = transitions;
    this.invertedTransitions = invertMap(transitions);
  }

  getTransitions(): IngredientTransitions {
    return this.transitions;
  }

  getInvertedTransitions(): InvertedIngredientTransitions {
    return this.invertedTransitions;
  }
}
