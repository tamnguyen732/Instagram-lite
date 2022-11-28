import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import { BsHeart, BsEmojiSmile, BsChat, BsBookmark } from 'react-icons/bs';
import { SlCursor } from 'react-icons/sl';
import FormField from '~/components/FormField';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import EmojiIcon from '~/components/Icon/EmojiIcon';
const cx = bindClass(styles);
const CommentAction = () => {
  const [value, setValue] = useState<string>('');
  const [activeList, setActiveList] = useState<boolean>(false);
  const ref = useRef<any | null>(null);
  return (
    <div className={cx('container')}>
      <div className={cx('icon-wrapper')}>
        <div className={cx('icon1')}>
          <BsHeart />
          <BsChat />
          <SlCursor />
        </div>
        <BsBookmark className={cx('icon2')} />
      </div>
      <div className={cx('like')}>
        <span>Tam Nguyen</span>
        <span> and</span>
        <span>other people</span>
        <span> has liked</span>
      </div>
      <span className={cx('time')}>1 day ago</span>
      <div className={cx('input-wrapper')}>
        <BsEmojiSmile onClick={() => setActiveList(!activeList)} />
        <FormField
          placeholder='Write comment...'
          ref={ref}
          className={cx('input')}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <span className={cx('post-action', value ? 'active' : '')}>Post</span>
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

export default CommentAction;
