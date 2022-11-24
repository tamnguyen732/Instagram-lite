import { MODAL_TYPES } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const PostActionModal = () => {
  return <div key={MODAL_TYPES.POST_ACTION} className={cx('container')}></div>;
};

export default PostActionModal;
