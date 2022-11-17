import { MODAL_TYPES } from '~/constants/modal';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';

const cx = bindClass(styles);

const MessageModal = () => {
  return (
    <>
      <div key={MODAL_TYPES.NEW_MESSAGE} className={cx('container')}></div>;
    </>
  );
};
export default MessageModal;
