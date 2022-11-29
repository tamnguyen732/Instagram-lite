import Profile from '~/components/Profile';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { TbPhone } from 'react-icons/tb';
import { AiOutlineVideoCamera } from 'react-icons/ai';
import { IoInformationCircleOutline } from 'react-icons/io5';
const cx = bindClass(styles);
const Header = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('wrapper')}>
        <Profile
          className={cx('profile')}
          name='tamnguyen'
          subText='2 hour ago'
          src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
          alt='profile'
        />
        <div className={cx('icons')}>
          <TbPhone />
          <AiOutlineVideoCamera />
          <IoInformationCircleOutline />
        </div>
      </div>
    </div>
  );
};

export default Header;
