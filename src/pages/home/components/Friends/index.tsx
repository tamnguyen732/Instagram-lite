import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Image from '~/components/Image';
import Loading from '~/components/Loading';
import fetchUsersFriends from './fetchUsersFriends';

const cx = bindClass(styles);

const Friends = () => {
  const { users, loading } = fetchUsersFriends();

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
          <span>View All</span>
        </div>
        {loading ? (
          <Loading size='md' className={cx('loading')} />
        ) : (
          <div className={cx('friends')}>
            {users.map((user) => {
              return (
                <div className={cx('friend-wrapper')}>
                  <div className={cx('profile-wrapper')}>
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
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
