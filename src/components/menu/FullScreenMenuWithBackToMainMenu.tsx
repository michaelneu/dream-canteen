import { useMemo } from "react";
import React from "react";
import { invariant } from "../../lib/invariant";
import {
  FullScreenMenu,
  IProps as IFullScreenMenuProps,
} from "../FullScreenMenu";

const BACK_TO_MAIN_MENU_SYMBOL = Symbol();

interface IProps<TOption> extends IFullScreenMenuProps<TOption> {
  onBackToMainMenu: () => void;
}

type IOption<TOption> = IProps<TOption>["options"][number];

export function FullScreenMenuWithBackToMainMenu<TOption>({
  options,
  onSelectOption,
  onBackToMainMenu,
  ...props
}: IProps<TOption>) {
  const menuSymbolsToOptions = useMemo(() => {
    const map = new Map<symbol, IOption<TOption>>();

    for (const option of options) {
      map.set(Symbol(), option);
    }

    return map;
  }, [options]);

  const optionsIncludingBackToMainMenu = useMemo(() => {
    const optionsWithSymbols = Array.from(menuSymbolsToOptions.entries()).map(
      ([symbol, option]) => ({
        label: option.label,
        value: symbol,
      }),
    );

    return [
      ...optionsWithSymbols,
      {
        label: "\u2190     Back      ",
        value: BACK_TO_MAIN_MENU_SYMBOL,
      },
    ];
  }, [menuSymbolsToOptions]);

  return (
    <FullScreenMenu
      {...props}
      options={optionsIncludingBackToMainMenu}
      onSelectOption={(symbol) => {
        if (symbol === BACK_TO_MAIN_MENU_SYMBOL) {
          onBackToMainMenu();
          return;
        }

        const option = menuSymbolsToOptions.get(symbol);
        invariant(option != null, "Cannot find level description");
        onSelectOption(option.value);
      }}
    />
  );
}
