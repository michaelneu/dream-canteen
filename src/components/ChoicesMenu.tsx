import React, { useEffect, useMemo, useState } from "react";
import { invariant } from "../lib/invariant";
import { BLOCK_SIZE } from "../config";
import { BoundingBox } from "../lib/BoundingBox";
import { useKeyDownWhileGameIsRunning } from "../hooks/useKeyDownWhileGameIsRunning";
import { Keys } from "../lib/Keys";
import { IRenderable } from "../types/IRenderable";
import { useGameStateContext } from "../contexts/GameStateContext";
import { Group } from "./primitives/Group";
import { SelectionHighlight } from "./SelectionHighlight";
import { Rectangle } from "./primitives/Rectangle";
import { MonospaceText } from "./primitives/MonospaceText";

const BORDER = 10;

interface IProps<T extends IRenderable> {
  boundingBox: BoundingBox;
  choices: readonly T[];
  onChoice: (value: T) => void;
  onHide: () => void;
}

export function ChoicesMenu<T extends IRenderable>({
  boundingBox,
  choices,
  onChoice,
  onHide,
}: IProps<T>) {
  invariant(choices.length > 0, "Cannot render menu without choices");
  const {
    state: { levelDescription },
  } = useGameStateContext();

  const itemCountIncludingCloseButton = choices.length + 1;
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(0);

  useEffect(() => {
    setSelectedChoiceIndex(0);
  }, [itemCountIncludingCloseButton]);

  useKeyDownWhileGameIsRunning(Keys.ArrowRight, () => {
    setSelectedChoiceIndex(
      (value) => (value + 1) % itemCountIncludingCloseButton,
    );
  });

  useKeyDownWhileGameIsRunning(Keys.ArrowLeft, () => {
    setSelectedChoiceIndex(
      (value) =>
        (itemCountIncludingCloseButton + (value - 1)) %
        itemCountIncludingCloseButton,
    );
  });

  useKeyDownWhileGameIsRunning(Keys.Space, () => {
    if (selectedChoiceIndex >= choices.length) {
      onHide();
      return;
    }

    onChoice(choices[selectedChoiceIndex]);
  });

  const height = BLOCK_SIZE + 2 * BORDER;
  const width =
    itemCountIncludingCloseButton * BLOCK_SIZE +
    (itemCountIncludingCloseButton - 1) * BORDER +
    2 * BORDER;

  const x = boundingBox.getCenterX() - width / 2;
  const y = boundingBox.getTopLeftY() - BLOCK_SIZE - BORDER * 3;

  const selectedBoundingBox = useMemo(() => {
    return new BoundingBox(
      selectedChoiceIndex * (BORDER + BLOCK_SIZE) + BORDER,
      BORDER,
    );
  }, [selectedChoiceIndex]);

  return (
    <Group x={x} y={y}>
      <Rectangle x={0} y={0} width={width} height={height} color="grey" />

      {choices.map((choice, index) => {
        const choiceScale = 0.5;
        const choiceSize = BLOCK_SIZE * choiceScale;

        const centerOffset = BLOCK_SIZE / 2 - choiceSize / 2;
        const choiceTopLeftX = BORDER + (BLOCK_SIZE + BORDER) * index;
        const choiceCenterX = choiceTopLeftX + centerOffset;

        const choiceTopLeftY = BORDER;
        const choiceCenterY = choiceTopLeftY + centerOffset;

        return (
          <React.Fragment key={index}>
            <Group x={choiceCenterX} y={choiceCenterY} scale={choiceScale}>
              {choice.render(levelDescription)}
            </Group>
          </React.Fragment>
        );
      })}

      <Group
        x={BORDER + (BLOCK_SIZE + BORDER) * (itemCountIncludingCloseButton - 1)}
        y={BORDER}
      >
        <MonospaceText
          x={BLOCK_SIZE / 2}
          y={BLOCK_SIZE * 0.4}
          color="#ccc"
          align="center"
          fontSize={32}
          text={`\u24E7`}
        />

        <MonospaceText
          x={BLOCK_SIZE / 2}
          y={BLOCK_SIZE * 0.7}
          color="#ccc"
          align="center"
          fontSize={16}
          text="Close"
        />
      </Group>

      <SelectionHighlight boundingBox={selectedBoundingBox} />
    </Group>
  );
}
