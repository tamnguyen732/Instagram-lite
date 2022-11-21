import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Button from '~/components/Button';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const WarningModal = () => {
  const { hideModal, modalsType } = useModalContext();
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#root');
    if (!ref.current) return;
    setMounted(true);
  }, [modalsType.length]);

  const handleHideModal = () => {
    hideModal(modalsType);
  };
  console.log(modalsType);
  return mounted && ref.current
    ? createPortal(
        <div className={cx('container')}>
          <div className={cx('overlay')} />
          <div className={cx('content')}>
            <Button onClick={handleHideModal} className={cx('cancel2')} danger size='md'>
              Remove
            </Button>
            <Button
              onClick={() => hideModal(MODAL_TYPES.WARNING_USER)}
              className={cx('cancel')}
              primary
              size='md'
            >
              Cancel
            </Button>
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default WarningModal;
