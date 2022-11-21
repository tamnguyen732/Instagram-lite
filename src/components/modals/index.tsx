import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import { inputValue } from './PostModal/detectInputValue';
import styles from './styles.module.scss';
const cx = bindClass(styles);
interface Props {
  children?: ReactNode;
}
const RootModal = ({ children }: Props) => {
  const { hideModal, showModal, modalsType } = useModalContext();
  const [mounted, setMounted] = useState<boolean>(false);
  const hasInputvalue = inputValue();
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
    if (hasInputvalue) {
      showModal(MODAL_TYPES.WARNING_USER);
    } else {
      hideModal(MODAL_TYPES.POST_CREATOR);
    }
  };

  return mounted && ref.current
    ? createPortal(
        <div className={cx('modal')}>
          <div
            onClick={handleOverlay}
            className={cx('overlay', modalsType.length ? 'active' : '')}
          />
          <div className={cx('content')}> {children} </div>
        </div>,
        ref.current!
      )
    : null;
};
export default RootModal;
