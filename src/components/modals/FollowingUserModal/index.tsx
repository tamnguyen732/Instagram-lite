import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { CgClose } from 'react-icons/cg';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { useAuthSelector } from '~/redux/selector';
import { useFollowUser } from '~/hooks/useFollowUser';
const cx = bindClass(styles);

const FollowingUserModal = () => {
  const { selectedUser, currentUser } = useAuthSelector();
  const { hideModal } = useModalContext();
  const { getMatchingElement } = useFollowUser(selectedUser!);
  const getMatchingElementsById = getMatchingElement('id');

  const matchingUsers = getMatchingElementsById(currentUser?.following!, selectedUser?.following!);
  return (
    <div key={MODAL_TYPES.FOLLOWING_USER} className={cx('container')}>
      <div className={cx('header-wrapper')}>
        <h4>Following</h4>
        <CgClose onClick={() => hideModal(MODAL_TYPES.FOLLOWING_USER)} />
      </div>
      <div className={cx('main-wrapper')}>
        {selectedUser?.following?.length &&
          selectedUser?.following?.map((user) => {
            console.log(user.id);
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
                {matchingUsers.find((matchingUser) => matchingUser.id === user.id) ? (
                  <Button className={cx('button')} outline size='sm'>
                    Following
                  </Button>
                ) : (
                  <Button className={cx('button')} primary size='sm'>
                    Follow
                  </Button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FollowingUserModal;
