import Image from '~/components/Image';
import { MainLayout } from '~/layouts/MainLayout';
import { bindClass } from '~/lib/classNames';

import styles from './styles.module.scss';

const cx = bindClass(styles);
const PostDetail = () => {
  return (
    <>
      <MainLayout title='PostDetail'>
        <div className={cx('container')}>
          <div className={cx('header')}>
            <Image
              className={cx('avatar')}
              src={
                'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
              }
              alt='profile'
              objectFit='cover'
            />
            <div className={cx('footer')}></div>
          </div>
          <div className={cx('footer')}></div>
        </div>
      </MainLayout>
    </>
  );
};

export default PostDetail;
