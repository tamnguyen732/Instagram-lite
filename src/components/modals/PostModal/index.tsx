import { MODAL_TYPES } from '~/constants/modal';
import { useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';

const cx = bindClass(styles);

const PostModal = () => {
  const { isShow } = useModalContext();
  return (
    <>
      <div key={MODAL_TYPES.POST_CREATOR} className={cx('container')}></div>;
    </>
  );
};
export default PostModal;
