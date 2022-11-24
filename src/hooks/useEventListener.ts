import { useEffect, useRef } from 'react';

type CallbackEvent = (e: MouseEvent) => void;

type EventListener = (
  eventname: keyof WindowEventMap,
  handler: CallbackEvent,
  element?: HTMLElement | Window
) => void;

const useEventListener: EventListener = (eventName, handler, element) => {
  const savedHandlerRef = useRef<any>(null);

  useEffect(() => {
    savedHandlerRef.current = handler;
  }, [handler]);
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
