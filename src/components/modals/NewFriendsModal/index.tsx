import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { CgClose } from 'react-icons/cg';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useUserSelector } from '~/redux/selector';
const cx = bindClass(styles);

const NewFriendsModal = () => {
  const { users } = useUserSelector();
  const { hideModal } = useModalContext();
  return (
    <div key={MODAL_TYPES.RECOMMENDED_FRIENDS} className={cx('container')}>
      <div className={cx('header-wrapper')}>
        <h4>Suggestions</h4>
        <CgClose onClick={() => hideModal(MODAL_TYPES.RECOMMENDED_FRIENDS)} />
      </div>
      <div className={cx('main-wrapper')}>
        {users.length &&
          users.map((user) => {
            return (
              <div className={cx('profile-wrapper')}>
                <div className={cx('profile')}>
                  <Image
                    className={cx('image')}
                    src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
                    alt='profile'
                    objectFit='cover'
                    profile
                  />
                  <span>{user.username}</span>
                </div>
                <Button className={cx('button')} primary size='sm'>
                  Follow
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NewFriendsModal;
