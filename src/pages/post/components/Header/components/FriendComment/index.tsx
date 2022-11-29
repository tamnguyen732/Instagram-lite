import Image from '~/components/Image';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';

const cx = bindClass(styles);

const FriendComment = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('caption-wrapper')}>
        <Image
          className={cx('profile2')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='profile'
          profile
        />
        <div className={cx('content-wrapper')}>
          <p className={cx('text')}>
            <span> Tam Nguyen</span> this is cententtttttt fdjfndjfndjfd is cententtttttt
            fdjfndjfndjfd is cententtttttt fdjfndjfndjfd
          </p>
          <div className={cx('time-wrapper')}>
            <span>1 hour ago</span>
            <span> 0 likes</span>
            <span> reply</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendComment;
