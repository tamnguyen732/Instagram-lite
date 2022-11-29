import Image from '~/components/Image';
import Profile from '~/components/Profile';
import { bindClass } from '~/lib/classNames';
import Caption from './components/Caption';
import CommentAction from './components/CommentAction';
import FriendComment from './components/FriendComment';
import styles from './styles.module.scss';

const cx = bindClass(styles);

const Header = () => {
  return (
    <div className={cx('container')}>
      <Image
        className={cx('left')}
        src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
        alt='profile'
      />
      <div className={cx('right')}>
        <div className={cx('profile-wrapper')}>
          <Profile
            name='Tam Nguyen'
            className={cx('profile')}
            src={
              'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
            }
            alt='profile'
            subText='Tasmania'
          />
          <span>Following</span>
        </div>
        <div className={cx('content-wrapper')}>
          <Caption />
          <FriendComment />
          <FriendComment />
        </div>
        <CommentAction />
      </div>
    </div>
  );
};

export default Header;
