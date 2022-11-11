import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { useState } from 'react';
import FormField from '~/components/FormField';
const cx = bindClass(styles);
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Image from '~/components/Image';
import { logo } from '~/assets/images';
import Button from '~/components/Button';
interface NavProps {
  subBarActive: boolean;
  setSubBarActive?: (subBarActive: boolean) => void;
  title: string;
}
const SubBar = ({ subBarActive, title }: NavProps) => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className={cx('container', subBarActive ? 'active' : '')}>
      {title === 'Search' ? (
        <div className={cx('search-wrapper')}>
          <h3>Search</h3>
          <div className={cx('input-wrapper')}>
            <FormField
              className={cx('input')}
              value={search}
              placeholder='Search'
              onChange={(e) => setSearch(e.target.value)}
            />
            <AiOutlineCloseCircle className={cx('icon')} onClick={() => setSearch('')} />
          </div>
          <hr className={cx('hr')} />
          <h3 className={cx('recently')}>Recently</h3>
          <p className={cx('recently')}>No content was found recently</p>
        </div>
      ) : (
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
                  rounded
                />
                <div className={cx('name')}>
                  <span>Adam</span>
                  <span>started following you </span>
                  <span>7 days ago </span>
                </div>
                <Button className={cx('button')} primary size='md'>
                  Following
                </Button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SubBar;
