import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';

const cx = bindClass(styles);
const Stories = () => {
  return <div className={cx('container')}></div>;
};

export default Stories;
