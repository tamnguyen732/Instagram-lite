import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
import fetchUsersFriends from './fetchUsersFriends';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import Link from 'next/link';
import { useStoreDispatch } from '~/redux/store';
import { authAction } from '~/redux/slices/authSlice';
import { UserFragment } from '~/types/generated';

const cx = bindClass(styles);

const Friends = () => {
  const { randomUsers, loading } = fetchUsersFriends();
  const dispatch = useStoreDispatch();
  const { showModal } = useModalContext();

  const handleSelectedUser = (user: UserFragment) => {
    dispatch(authAction.setSelectedUser(user));
  };

  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <Image
          className={cx('profile-image')}
          src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
          alt='post-pic'
          objectFit='cover'
          rounded
        />
        <span>Tam Nguyen</span>
      </div>
      <div className={cx('footer')}>
        <div className={cx('suggest')}>
          <span>Suggest for you</span>
          <span onClick={() => showModal(MODAL_TYPES.RECOMMENDED_FRIENDS)}>View All</span>
        </div>
        {loading ? (
          <Loading size='md' className={cx('loading')} />
        ) : (
          <div className={cx('friends')}>
            {randomUsers.map((user) => {
              return (
                <Link href={user.username} className={cx('friend-wrapper')}>
                  <div
                    onClick={() => handleSelectedUser(user)}
                    key={user.id}
                    className={cx('profile-wrapper')}
                  >
                    <Image
                      className={cx('friend-image')}
                      src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
                      alt='post-pic'
                      objectFit='cover'
                      rounded
                    />
                    <span>{user.username}</span>
                  </div>
                  <span>Follow</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
