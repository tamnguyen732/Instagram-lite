import React from 'react';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Image from '~/components/Image';
import { RiMoreLine } from 'react-icons/ri';
import HoverProfile from '../HoverProfile';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
const cx = bindClass(styles);
const Header = () => {
  const { showModal } = useModalContext();
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <div className={cx('info')}>
          <div className={cx('profile')}>
            <HoverProfile />
            <Image
              className={cx('avatar')}
              src={
                'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
              }
              alt='profile'
              objectFit='cover'
              profile
            />
            <div className={cx('name-wrapper')}>
              <span className={cx('name')}>Tam nguyen</span>
              <span className={cx('location')}>Tasmania</span>
            </div>
          </div>
          <RiMoreLine onClick={() => showModal(MODAL_TYPES.POST_ACTION)} className={cx('more')} />
        </div>

        <Image
          className={cx('post-image')}
          src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
          alt='post-pic'
          objectFit='cover'
        />
      </div>
    </div>
  );
};

export default Header;
