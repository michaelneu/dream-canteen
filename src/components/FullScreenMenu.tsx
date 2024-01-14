import React, { useState } from "react";
import clamp from "fbjs/lib/clamp";
import { invariant } from "../lib/invariant";
import { firstx } from "../lib/firstx";
import { useKeyDown } from "../hooks/useKeyDown";
import { Keys } from "../lib/Keys";
import { useScreenSizeContext } from "../contexts/ScreenSizeContext";
import { CenteredOnScreen } from "./CenteredOnScreen";
import { Group } from "./primitives/Group";
import { MonospaceText } from "./primitives/MonospaceText";
import { Rectangle } from "./primitives/Rectangle";
import { Clickable } from "./primitives/Clickable";

const BUTTON_WIDTH = 300;
const BUTTON_HEIGHT = 75;
const BUTTON_VERTICAL_GAP = 25;

interface IOption<TOption> {
  label: string;
  value: TOption;
}

interface IPropsBase<TOption> {
  options: readonly IOption<TOption>[];
  onSelectOption: (value: TOption) => void;
  backdropOpacity?: number;
}

interface IPropsWithHeader<TOption> extends IPropsBase<TOption> {
  header: React.ReactNode;
  headerHeight: number;
}

type IProps<TOption> = IPropsBase<TOption> | IPropsWithHeader<TOption>;

export function FullScreenMenu<TOption>({
  options,
  onSelectOption,
  backdropOpacity = 0.5,
  ...props
}: IProps<TOption>) {
  invariant(options.length > 0, "Cannot select option without options");

  const [activeOption, setActiveOption] = useState(() => firstx(options).value);

  useKeyDown(Keys.ArrowDown, () => {
    setActiveOption((value) => {
      const currentIndex = options.findIndex(
        (option) => option.value === value,
      );

      invariant(currentIndex !== -1, "Option should be in options");
      const nextIndex = (currentIndex + 1) % options.length;
      return options[nextIndex].value;
    });
  });

  useKeyDown(Keys.ArrowUp, () => {
    setActiveOption((value) => {
      const currentIndex = options.findIndex(
        (option) => option.value === value,
      );

      invariant(currentIndex !== -1, "Option should be in options");
      const nextIndex = (options.length + (currentIndex - 1)) % options.length;
      return options[nextIndex].value;
    });
  });

  useKeyDown(Keys.Space, () => {
    onSelectOption(activeOption);
  });

  const { width: screenWidth, height: screenHeight } = useScreenSizeContext();
  const renderedOptions = options.map((option, buttonIndex) => (
    <Button
      key={String(option.value)}
      x={0}
      y={
        buttonIndex * BUTTON_HEIGHT +
        (buttonIndex > 0 ? buttonIndex * BUTTON_VERTICAL_GAP : 0)
      }
      label={option.label}
      isActive={activeOption === option.value}
      onHover={() => setActiveOption(option.value)}
      onClick={() => onSelectOption(option.value)}
    />
  ));

  return (
    <Group x={0} y={0}>
      <Rectangle
        x={0}
        y={0}
        width={screenWidth}
        height={screenHeight}
        color={`rgba(255, 255, 255, ${clamp(backdropOpacity, 0, 1)})`}
      />

      <CenteredOnScreen
        width={BUTTON_WIDTH}
        height={
          BUTTON_HEIGHT * options.length +
          (options.length - 1) * BUTTON_VERTICAL_GAP +
          ("header" in props ? props.headerHeight + BUTTON_VERTICAL_GAP : 0)
        }
      >
        {"header" in props ? (
          <>
            {props.header}

            <Group x={0} y={props.headerHeight + BUTTON_VERTICAL_GAP}>
              {renderedOptions}
            </Group>
          </>
        ) : (
          renderedOptions
        )}
      </CenteredOnScreen>
    </Group>
  );
}

interface IButtonProps {
  x: number;
  y: number;
  label: string;
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
}

function Button({ x, y, label, isActive, onClick, onHover }: IButtonProps) {
  return (
    <Clickable x={x} y={y} onClick={onClick} onHover={onHover}>
      <Rectangle
        x={0}
        y={0}
        width={BUTTON_WIDTH}
        height={BUTTON_HEIGHT}
        color={isActive ? "orange" : "grey"}
      />

      <MonospaceText
        x={BUTTON_WIDTH / 2}
        y={BUTTON_HEIGHT / 2}
        fontSize={24}
        text={label}
        align="center"
      />
    </Clickable>
  );
}
