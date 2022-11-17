import { useEffect, useState } from 'react';

type debounceProps = (params: { value: string; time: number }) => void;

const useDebounce: debounceProps = ({ value, time }) => {
  const [debounceValue, setDeBounceValue] = useState<string>('');

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDeBounceValue(value);
    }, time);
    return () => clearTimeout(timeoutId);
  }, [value]);

  return debounceValue;
};

export default useDebounce;
