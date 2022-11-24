import { RefObject, useRef } from 'react';
import useClickOutside from '~/hooks/useClickOutside';
import { bindClass } from '~/lib/classNames';
import { emojiList } from './emojiList';
import styles from './styles.module.scss';

const cx = bindClass(styles);
interface EmojiIcon<T extends HTMLElement = HTMLInputElement> {
  value: string;
  setValue: (value: string) => void;
  inputRef: RefObject<T | null>;
  setActiveIconList: (value: boolean) => void;
  className?: string;
}
const EmojiIcon = ({ value, setValue, inputRef, setActiveIconList, className }: EmojiIcon) => {
  const divRef = useRef<any | null>(null);
  const getEmojiValue = (emoji: string) => {
    if (inputRef.current) {
      const cursor = inputRef.current!.selectionStart as number;
      const text = value.slice(0, cursor) + emoji + value.slice(cursor);
      setValue(text);
    }
    setActiveIconList(false);
  };

  useClickOutside(divRef, () => setActiveIconList(false));
  return (
    <div ref={divRef} className={cx('container', className)}>
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
