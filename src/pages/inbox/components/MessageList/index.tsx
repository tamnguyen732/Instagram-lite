import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { IoCreateOutline } from 'react-icons/io5';
import Image from '~/components/Image';
import { RiArrowDownSLine } from 'react-icons/ri';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
const cx = bindClass(styles);
const MessageList = () => {
  const { showModal } = useModalContext();
  return (
    <div className={cx('container')}>
      <div className={cx('header')}>
        <div className={cx('header-wrapper')}>
          <span>tamnguyen</span>
          <RiArrowDownSLine />
        </div>
        <IoCreateOutline onClick={() => showModal(MODAL_TYPES.NEW_MESSAGE)} />
      </div>
      <div className={cx('heading-text')}>
        <span>MAIN</span>
      </div>
      <ul className={cx('content')}>
        <li className={cx('content-wrapper')}>
          <Image
            className={cx('image')}
            src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
            alt='profile'
            objectFit='cover'
            rounded
          />
          <div className={cx('name')}>
            <span>Tamnguyen</span>
            <span>Online 2 hours ago</span>
          </div>
        </li>
        <li className={cx('content-wrapper')}>
          <Image
            className={cx('image')}
            src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
            alt='profile'
            objectFit='cover'
            rounded
          />
          <div className={cx('name')}>
            <span>Tamnguyen</span>
            <span>Online 2 hours ago</span>
          </div>
        </li>
        <li className={cx('content-wrapper')}>
          <Image
            className={cx('image')}
            src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
            alt='profile'
            objectFit='cover'
            rounded
          />
          <div className={cx('name')}>
            <span>Tamnguyen</span>
            <span>Online 2 hours ago</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default MessageList;
