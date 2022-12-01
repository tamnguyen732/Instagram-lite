import { useState, useRef } from 'react';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import { BsHeart, BsEmojiSmile, BsChat, BsBookmark } from 'react-icons/bs';
import { SlCursor } from 'react-icons/sl';
import showMoreContent from './showMoreContent';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import EmojiIcon from '~/components/Icon/EmojiIcon';
const cx = bindClass(styles);

const content: string =
  'start value has mixed support, consonsider using,start value has mixed support, consonsider using';
const Footer = () => {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [activeList, setActiveList] = useState<boolean>(false);
  const ref = useRef<any | null>(null);
  const limitContent = showMoreContent(content);
  const { showModal } = useModalContext();
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
        <span onClick={() => showModal(MODAL_TYPES.LIKE_LIST)}>other people</span>
        <span> has liked</span>
      </div>
      <div className={cx('status')}>
        <p>
          <span>Tam Nguyen </span>
          {showMore ? content : limitContent}
          {!showMore && <span onClick={() => setShowMore(true)}>Show more</span>}
        </p>
      </div>
      <span className={cx('view-comment')}>View all comments</span>
      <div className={cx('name')}>
        <div className={cx('comment')}>
          <span>Tam Nguyen</span>
          <p>start value support</p>
        </div>
        <BsHeart />
      </div>
      <span className={cx('time')}>1 day go</span>
      <div className={cx('input-wrapper')}>
        <BsEmojiSmile onClick={() => setActiveList(!activeList)} />
        <input
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

export default Footer;
