import { useEffect, useRef, useCallback } from 'react';

type CallbackEvent = (e: MouseEvent) => void;

type EventListener = (
  eventname: keyof WindowEventMap,
  handler: CallbackEvent,
  element?: HTMLElement | Window
) => void;

const useEventListener: EventListener = (eventName, handler, element) => {
  const savedHandlerRef = useRef<any>(null);

  const handlerWithMemo = useCallback((e: MouseEvent) => handler(e), [handler]);

  useEffect(() => {
    savedHandlerRef.current = handlerWithMemo;
  }, [handlerWithMemo]);
  useEffect(() => {
    const targetElement: HTMLElement | Window = element ?? window;
    if (!(targetElement && targetElement.addEventListener)) return;

    const eventListener = (e: Event) => savedHandlerRef.current(e);

    targetElement.addEventListener(eventName, eventListener);

    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
