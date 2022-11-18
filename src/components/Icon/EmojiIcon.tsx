import { RefObject } from 'react';
import { bindClass } from '~/lib/classNames';
import { emojiList } from './emojiList';
import styles from './styles.module.scss';

const cx = bindClass(styles);
interface EmojiIcon<T extends HTMLElement = HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  inputRef: RefObject<T | null>;
}
const EmojiIcon = ({ value, setValue, inputRef }: EmojiIcon) => {
  const getEmojiValue = (emoji: string) => {
    if (inputRef.current) {
      console.log(value);
      const cursor = inputRef.current!.selectionStart as number;
      const text = value.slice(0, cursor) + emoji + value.slice(cursor);
      setValue(text);
    }
  };
  return (
    <div className={cx('container')}>
      {emojiList.map((emj) => {
        return (
          <span
            onClick={() => {
              getEmojiValue(emj);
            }}
            className={cx('emoji')}
          >
            {emj}
          </span>
        );
      })}
    </div>
  );
};

export default EmojiIcon;
