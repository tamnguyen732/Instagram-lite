import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MODAL_TYPES } from '~/constants/modal';
import { ModalType, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';

const cx = bindClass(styles);

interface Props {
  children?: ReactNode;
}
const RootModal = ({ children }: Props) => {
  const { hideModal, isShow } = useModalContext();
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#root');
    if (!ref.current) return;
    if (isShow) document.body.style.overflow = 'hidden';
    setMounted(true);
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isShow]);

  return mounted && ref.current
    ? createPortal(
        isShow ? (
          <div className={cx('modal')}>
            <div
              onClick={() => {
                hideModal(MODAL_TYPES.POST_CREATOR as ModalType);
              }}
              className={cx('overlay')}
            />
            <div className={cx('content')}>{children}</div>
          </div>
        ) : null,
        ref.current!
      )
    : null;
};
export default RootModal;
