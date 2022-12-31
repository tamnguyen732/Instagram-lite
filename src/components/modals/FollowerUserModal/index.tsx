import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { CgClose } from 'react-icons/cg';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useAuthSelector, useUserSelector } from '~/redux/selector';
import { useFollowUser } from '~/hooks/useFollowUser';
const cx = bindClass(styles);

const FollowerUserModal = () => {
  const { selectedUser } = useAuthSelector();

  const { isFollowed } = useFollowUser(selectedUser!);
  const { hideModal } = useModalContext();
  console.log(selectedUser);
  return (
    <div key={MODAL_TYPES.FOLLOWER_USER} className={cx('container')}>
      <div className={cx('header-wrapper')}>
        <h4>Followers</h4>
        <CgClose onClick={() => hideModal(MODAL_TYPES.FOLLOWER_USER)} />
      </div>
      <div className={cx('main-wrapper')}>
        {selectedUser?.followers?.length &&
          selectedUser?.followers.map((user) => {
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

export default FollowerUserModal;
