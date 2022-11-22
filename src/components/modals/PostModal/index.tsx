import { useState } from 'react';
import { MODAL_TYPES } from '~/constants/modal';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import CreatePostContent from './components/CreatePostContent';
import CreatePostImage from './components/CreatePostImage';
import { getInputValue } from '../detectInputValue';
const cx = bindClass(styles);

const PostModal = () => {
  const { hasInputValue } = getInputValue();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  return (
    <div key={MODAL_TYPES.POST_CREATOR} className={cx('container', isExpand ? 'active' : '')}>
      <span className={cx('title')}>Create a new post</span>
      {hasInputValue && (
        <span onClick={() => setIsExpand(true)} className={cx('next')}>
          {isExpand ? 'Share' : 'Next'}
        </span>
      )}

      <CreatePostImage isExpand={isExpand} />
      {isExpand && <CreatePostContent />}
    </div>
  );
};
export default PostModal;
