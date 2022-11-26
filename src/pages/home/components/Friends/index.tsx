import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Image from '~/components/Image';
import Loading from '~/components/Loading';

const cx = bindClass(styles);
const Friends = () => {
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

        <div className={cx('friends')}>
          <div className={cx('friend-wrapper')}>
            <Image
              className={cx('friend-image')}
              src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
              alt='post-pic'
              objectFit='cover'
              rounded
            />
            <span>Tam Nguyen</span>
          </div>
          {/* <Loading size='sm' /> */}
          <span>Follow</span>
        </div>
      </div>
    </div>
  );
};

export default Friends;
