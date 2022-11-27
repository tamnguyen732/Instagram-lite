import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Image from '~/components/Image';
import Button from '~/components/Button';

const cx = bindClass(styles);

const HoverProfile = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <Image
          className={cx('profile')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='profile'
          objectFit='cover'
          rounded
        />
        <div className={cx('name')}>
          <span>Tam Nguyen</span>
          <span>Followed by Tam nguyen and 2 other follower</span>
        </div>
      </div>
      <div className={cx('content')}>
        <span>Post</span>
        <span>Followers</span>
        <span>Following</span>

        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='profile'
          objectFit='cover'
        />
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='profile'
          objectFit='cover'
        />
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='profile'
          objectFit='cover'
        />
      </div>
      <div className={cx('footer')}>
        <Button className={cx('btn')} size='sm'>
          Message
        </Button>
        <Button className={cx('btn')} size='sm'>
          Followed
        </Button>
      </div>
    </div>
  );
};

export default HoverProfile;
