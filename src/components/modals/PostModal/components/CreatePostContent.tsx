import React from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { screenshot1 } from '~/assets/images';
import Image from '~/components/Image';
const cx = bindClass(styles);

const CreatePostContent = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('wrapper')}>
          <Image
            className={cx('avatar')}
            src={
              'https://cdn-ajggd.nitrocdn.com/kMoOFpDlsOVtlYJLrnSRNCQXaUFHZPTY/assets/static/optimized/rev-9b0736f/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg#'
            }
            alt='profile'
            objectFit='cover'
            rounded
          />
          <span className={cx('name')}> Tam Nguyen</span>
        </div>
        <textarea className={cx('text-area')}></textarea>
      </div>
    </div>
  );
};

export default CreatePostContent;
