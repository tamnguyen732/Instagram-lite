import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';

const cx = bindClass(styles);

const PostModal = () => {
  return (
    <>
      <div className={cx('container')}></div>;
    </>
  );
};
export default PostModal;
