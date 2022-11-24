import { useState, useRef, MutableRefObject } from 'react';
import useEventListener from './useEventListener';

type ReturnHover = readonly [MutableRefObject<any>, boolean];

export const useHover = (): ReturnHover => {
  const [value, setValue] = useState<boolean>(false);

  const ref = useRef<any | null>(null);

  useEventListener('mouseover', () => setValue(true), ref.current);
  useEventListener('mouseout', () => setValue(false), ref.current);

  return [ref, value] as const;
};
