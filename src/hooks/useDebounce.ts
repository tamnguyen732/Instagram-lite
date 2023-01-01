import { useEffect, useMemo, useRef, useState } from 'react';

export const useDebounce = (value: string, milliSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [value, milliSeconds]);

  return useMemo(() => debouncedValue, [debouncedValue]);
};
