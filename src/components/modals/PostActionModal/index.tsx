import { useState } from 'react';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import { addPostAction, otherPost } from './moreAction';
import { toast } from 'react-toastify';
import styles from './styles.module.scss';
import copy from 'copy-to-clipboard';
const cx = bindClass(styles);
const PostActionModal = () => {
  const { hideModal, showModal } = useModalContext();
  const [favorite, setFavorites] = useState<boolean>(false);
  const [isFollowed, setIsFollow] = useState<boolean>(true);

  const mapActionPosts = otherPost;
  addPostAction('cancel', () => hideModal(MODAL_TYPES.POST_ACTION));
  addPostAction('addFavorites', () => {
    setFavorites(true);
  });
  addPostAction('unfollow', () => {
    hideModal(MODAL_TYPES.POST_ACTION);
    showModal(MODAL_TYPES.WARNING_USER);
  });
  addPostAction('follow', () => setIsFollow(true));
  addPostAction('copy', () => {
    copy('www.google.com');
    toast.success('success copied');
  });

  addPostAction('share', () => {
    hideModal(MODAL_TYPES.POST_ACTION);
    showModal(MODAL_TYPES.SHARE_POST);
  });
  return (
    <div key={MODAL_TYPES.POST_ACTION} className={cx('container')}>
      <ul className={cx('wrapper')}>
        {mapActionPosts.map(({ action, actionId, title }) => {
          if (isFollowed && actionId === 'follow') return null;
          if (!isFollowed && actionId === 'unfollow') return null;
          if (favorite && actionId === 'addFavorites') return null;
          if (!favorite && actionId === 'removeFavorites') return null;
          return (
            <li className={cx('item')} onClick={action}>
              {title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostActionModal;
