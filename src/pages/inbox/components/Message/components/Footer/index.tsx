import { useState, useRef } from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { BsEmojiSmile, BsHeart } from 'react-icons/bs';
import EmojiIcon from '~/components/Icon/EmojiIcon';
import { SlPicture } from 'react-icons/sl';
const cx = bindClass(styles);
const Footer = () => {
  const [value, setValue] = useState<string>('');
  const [activeList, setActiveList] = useState<boolean>(false);
  const ref = useRef<any | null>(null);
  return (
    <div className={cx('container')}>
      <div className={cx('input-wrapper')}>
        <BsEmojiSmile onClick={() => setActiveList(!activeList)} />
        <input
          ref={ref}
          placeholder='Messaging...'
          className={cx('input')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className={cx('icons')}>
          <input type='file' className={cx('file')} value='' />
          <SlPicture className={cx('icon')} />
          <BsHeart className={cx('icon')} />
        </div>
      </div>
      {activeList && (
        <EmojiIcon
          className={cx('icon-list')}
          setActiveIconList={setActiveList}
          value={value}
          setValue={setValue}
          inputRef={ref}
        />
      )}
    </div>
  );
};

export default Footer;
