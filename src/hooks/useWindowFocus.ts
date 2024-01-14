import { useEventListener } from "./useEventListener";

interface IProps {
  onFocus: () => void;
  onBlur: () => void;
}

export function useWindowFocus({ onFocus, onBlur }: IProps): void {
  useEventListener("focus", onFocus);
  useEventListener("blur", onBlur);
}
