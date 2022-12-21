import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const cx = bindClass(styles);

const SubBar = () => {
  const [search, setSearch] = useState<string>('');

  return (
    <div className={cx('container')}>
      <div className={cx('search-wrapper')}>
        <h3>Search</h3>
        <div className={cx('input-wrapper')}>
          <input
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
    </div>
  );
};
export default SubBar;
