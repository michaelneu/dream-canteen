import { useEffect, useRef } from "react";

type Listener<TEvent extends keyof WindowEventMap> = (
  event: WindowEventMap[TEvent],
) => void;

export function useEventListener<TEvent extends keyof WindowEventMap>(
  event: TEvent,
  listener: Listener<TEvent>,
): void {
  const listenerRef = useRef<Listener<TEvent> | null>(null);
  useEffect(() => {
    listenerRef.current = listener;
  });

  useEffect(() => {
    function handler(event: WindowEventMap[TEvent]) {
      listenerRef.current?.(event);
    }

    window.addEventListener(event, handler);

    return () => {
      window.removeEventListener(event, handler);
    };
  }, [event]);
}
