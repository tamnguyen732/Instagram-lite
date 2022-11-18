import { RefObject, useState } from 'react';

type ReturnProp = () => {
  getTextValue: (value: string, ref: RefObject<HTMLInputElement>) => void;
  getEmojiValue: (emoji: any) => void;
  value: string;
};

const useGetEmoji: ReturnProp = () => {
  const [value, setValue] = useState<string>('');
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const getTextValue = (value: string, ref: RefObject<HTMLInputElement>) => {
    setValue(value);
    if (ref.current) {
      setInputRef(ref.current);
    }
  };

  const getEmojiValue = (emj: any) => {
    if (inputRef) {
      const { selectionStart, selectionEnd } = inputRef;
      const newVal =
        value.slice(0, selectionStart as number) + emj.emoji + value.slice(selectionEnd as number);
      setValue(newVal);
    }
  };

  return { getTextValue, getEmojiValue, value };
};

export default useGetEmoji;
