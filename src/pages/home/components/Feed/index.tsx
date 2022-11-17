import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';

const cx = bindClass(styles);
const Feed = () => {
  return (
    <>
      <div className={cx('container')}></div>
      <div className={cx('container')}></div>;
    </>
  );
};

export default Feed;
