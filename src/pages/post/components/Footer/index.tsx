import Image from '~/components/Image';
import { bindClass } from '~/lib/classNames';

import styles from './styles.module.scss';

const cx = bindClass(styles);
const Footer = () => {
  return (
    <div className={cx('container')}>
      <span>
        More posts from <span>Tam nguyen</span>
      </span>
      <div className={cx('image-wrapper')}>
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='posts-image'
          objectFit='cover'
        />
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='posts-image'
          objectFit='cover'
        />
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='posts-image'
          objectFit='cover'
        />
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='posts-image'
          objectFit='cover'
        />
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='posts-image'
          objectFit='cover'
        />
        <Image
          className={cx('post-image')}
          src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
          alt='posts-image'
          objectFit='cover'
        />
      </div>
    </div>
  );
};

export default Footer;
