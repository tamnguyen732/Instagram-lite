import { SetStateAction, useState, Dispatch, useEffect } from 'react';

type inputTypes = <T extends unknown>(value: T) => void;

const detectInputValue = () => {
  let setValueState: Dispatch<SetStateAction<boolean>> = () => {};
  const checkInputValue: inputTypes = (value) => {
    useEffect(() => {
      if (value) {
        setValueState(true);
      } else {
        setValueState(false);
      }
    }, [value]);
  };

  const inputValue = () => {
    const [hasInputValue, setHasInputValue] = useState<boolean>(false);

    setValueState = setHasInputValue;
    return hasInputValue;
  };

  return { checkInputValue, inputValue };
};

export const { checkInputValue, inputValue } = detectInputValue();
