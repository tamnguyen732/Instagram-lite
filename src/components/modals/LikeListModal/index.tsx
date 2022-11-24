import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { CgClose } from 'react-icons/cg';
import Image from '~/components/Image';
import Button from '~/components/Button';
const cx = bindClass(styles);

const LikeListModal = () => {
  const { hideModal } = useModalContext();
  return (
    <div key={MODAL_TYPES.LIKE_LIST} className={cx('container')}>
      <div className={cx('header-wrapper')}>
        <h4>Likes</h4>
        <CgClose onClick={() => hideModal(MODAL_TYPES.LIKE_LIST)} />
      </div>
      <p>Tam nguyen can see all the likes</p>

      <div className={cx('main-wrapper')}>
        <div className={cx('profile')}>
          <Image
            className={cx('image')}
            src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
            alt='profile'
            objectFit='cover'
            rounded
          />
          <span>Tam nguyen</span>
        </div>
        <Button className={cx('button')} primary size='sm'>
          Follow
        </Button>
      </div>
    </div>
  );
};

export default LikeListModal;
