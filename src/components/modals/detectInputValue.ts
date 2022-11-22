import { SetStateAction, useState, Dispatch, useEffect } from 'react';

type inputTypes = <T extends unknown>(value: T) => void;

const detectInputValue = () => {
  let setValueState: Dispatch<SetStateAction<boolean>> = () => {};
  const checkInputValue: inputTypes = (value) => {
    if (value) {
      setValueState(true);
    } else {
      setValueState(false);
    }
  };

  const getInputValue = () => {
    const [hasInputValue, setHasInputValue] = useState<boolean>(false);

    setValueState = setHasInputValue;
    return { hasInputValue, setHasInputValue };
  };

  return { checkInputValue, getInputValue };
};

export const { checkInputValue, getInputValue } = detectInputValue();
