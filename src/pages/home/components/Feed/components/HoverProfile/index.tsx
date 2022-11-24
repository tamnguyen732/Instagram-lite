import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';

const cx = bindClass(styles);

const HoverProfile = () => {
  return <div className={cx('container')}></div>;
};

export default HoverProfile;
