import { MutableRefObject, useEffect } from 'react';

interface Args<T> {
  inputRef: MutableRefObject<any>;
  value?: T;
}

const useAutoFocus = <T extends unknown>({ inputRef, value }: Args<T>) => {
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current, value]);
};

export default useAutoFocus;
