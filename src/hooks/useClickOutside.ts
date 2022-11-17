import { RefObject } from 'react';
import useEventListener from './useEventListener';

const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T> | Array<RefObject<T>>,
  handler: () => void
): void => {
  const handleClick = (e: MouseEvent) => {
    const checkClickOutside = (r: RefObject<T>) =>
      r.current && !r.current.contains(e.target as Node);

    const isClickOutSide = Array.isArray(ref)
      ? ref.every(checkClickOutside)
      : checkClickOutside(ref);
    if (isClickOutSide) handler();
  };

  useEventListener('mousedown', handleClick);
  useEventListener('touchstart', handleClick);
};

export default useClickOutside;
