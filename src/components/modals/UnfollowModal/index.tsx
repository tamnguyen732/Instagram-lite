import Image from '~/components/Image';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
const cx = bindClass(styles);

const UnfollowModal = () => {
  const { hideModal } = useModalContext();
  return (
    <div key={MODAL_TYPES.UNFOLLOW} className={cx('container')}>
      <Image
        className={cx('profile-image')}
        src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
        alt='post-pic'
        objectFit='cover'
        rounded
      />
      <span>Unfollow Tam Nguyen?</span>
      <ul className={cx('action')}>
        <li>Unfollow</li>
        <li onClick={() => hideModal(MODAL_TYPES.UNFOLLOW)}>Cancel</li>
      </ul>
    </div>
  );
};

export default UnfollowModal;
