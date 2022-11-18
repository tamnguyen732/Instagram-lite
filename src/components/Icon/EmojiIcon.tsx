import { RefObject } from 'react';
import { bindClass } from '~/lib/classNames';
import { emojiList } from './emojiList';
import styles from './styles.module.scss';

const cx = bindClass(styles);
interface EmojiIcon<T extends HTMLElement = HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  inputRef: RefObject<T | null>;
  setActiveIconList: (value: boolean) => void;
}
const EmojiIcon = ({ value, setValue, inputRef, setActiveIconList }: EmojiIcon) => {
  const getEmojiValue = (emoji: string) => {
    if (inputRef.current) {
      const cursor = inputRef.current!.selectionStart as number;
      const text = value.slice(0, cursor) + emoji + value.slice(cursor);
      setValue(text);
    }
    setActiveIconList(false);
  };
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
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
    </div>
  );
};

export default EmojiIcon;
