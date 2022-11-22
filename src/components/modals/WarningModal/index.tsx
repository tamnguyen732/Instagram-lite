import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const handleHideAllModals = () => {
    hideModal(modalsType);
  };
  return mounted && ref.current
    ? createPortal(
        <div className={cx('container')}>
          <div className={cx('overlay')} />
          <div className={cx('content')}>
            <div className={cx('wrapper')}>
              <div className={cx('header')}>
                <h4>Delete Post?</h4>
                <span>You will lose everything when you leave.</span>
              </div>
              <div className={cx('action')}>
                <span onClick={handleHideAllModals} className={cx('text1')}>
                  Delete
                </span>
                <span onClick={() => hideModal(MODAL_TYPES.WARNING_USER)} className={cx('text2')}>
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </div>,
        ref.current
      )
    : null;
};

export default WarningModal;
