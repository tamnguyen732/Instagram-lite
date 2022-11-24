import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
const cx = bindClass(styles);
interface Props {
  children?: ReactNode;
}
const RootModal = ({ children }: Props) => {
  const { hideModal, showModal, modalsType, input } = useModalContext();
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#root');
    if (!ref.current) return;
    if (modalsType.length) document.body.style.overflow = 'hidden';
    setMounted(true);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalsType.length]);
  const handleOverlay = () => {
    if (input.status || input.upload || input.location) {
      showModal(MODAL_TYPES.WARNING_USER);
    } else {
      hideModal(modalsType);
    }
  };

  return mounted && ref.current
    ? createPortal(
        modalsType.length && (
          <div className={cx('modal')}>
            <div
              onClick={handleOverlay}
              className={cx('overlay', modalsType.length ? 'active' : '')}
            />
            <div className={cx('content')}> {children} </div>
          </div>
        ),
        ref.current!
      )
    : null;
};
export default RootModal;
