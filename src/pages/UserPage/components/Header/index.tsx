import Button from '~/components/Button';
import Image from '~/components/Image';
import { bindClass } from '~/lib/classNames';
import { RiMoreLine } from 'react-icons/ri';
import { RiArrowDownSLine } from 'react-icons/ri';
import styles from './styles.module.scss';

const cx = bindClass(styles);

const Header = () => {
  return (
    <div className={cx('container')}>
      <Image
        className={cx('image')}
        src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
        alt='profile'
        rounded
      />
      <div className={cx('info')}>
        <div className={cx('name')}>
          <span>Tam nguyen</span>
          <Button className={cx('btn')}>
            Following <RiArrowDownSLine className={cx('caret')} />
          </Button>
          <Button className={cx('btn')}>Message</Button>
          <RiMoreLine className={cx('icon')} />
        </div>
        <div className={cx('post')}>
          <span className={cx('text')}>
            <span className={cx('text-number')}>20</span> Posts
          </span>
          <span className={cx('text')}>
            <span className={cx('text-number')}>30</span> Follower
          </span>
          <span className={cx('text')}>
            <span className={cx('text-number')}>50</span> Following
          </span>
        </div>
        <p> Bienvenidos a Welcome to the official Leo Messi Instagram account</p>
        <span>
          <span>tamnguyen, adam</span> and 10 other people are following
        </span>
      </div>
    </div>
  );
};

export default Header;
