import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { RefObject, useState, forwardRef } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { logo } from '~/assets/images';
const cx = bindClass(styles);
interface NavProps<T extends HTMLElement = HTMLDivElement> {
  subBarActive: boolean;
  setSubBarActive?: (subBarActive: boolean) => void;
  title: string;
  ref: RefObject<T>;
}
const SubBar = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className={cx('noti-wrapper')}>
      <h3>Notification</h3>
      <hr className={cx('noti-hr')} />
      <p>Previously</p>
      <ul className={cx('info-list')}>
        <li className={cx('info-item')}>
          <div className={cx('info-wrapper')}>
            <Image
              className={cx('avartar')}
              src={logo.src}
              alt='avartar'
              objectFit='cover'
              profile
            />
            <div className={cx('name')}>
              <span>Adam</span>
              <span>started following you. </span>
              <span>7 days ago </span>
            </div>
            <Button className={cx('button')} primary size='md'>
              Following
            </Button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SubBar;
