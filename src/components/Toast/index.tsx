import { createPortal } from 'react-dom';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { BsCheckCircle } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { getToasts } from '~/hooks/useToast';
const cx = bindClass(styles);

interface Props {
  show?: boolean;
}
const Toast = ({ show }: Props) => {
  const toasts = getToasts();
  const [mounted, setMounted] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(true);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#root');
    setMounted(true);
    let timeoutId = setTimeout(() => {
      setActive(false);
    }, 2500);
    return () => clearTimeout(timeoutId);
  }, []);

  return mounted && ref.current
    ? createPortal(
        <div className={cx('container')}>
          {toasts?.map((toast: any) => {
            return (
              <div className={cx('toast', active ? 'active' : '')}>
                <div className={cx('toast-content')}>
                  <div className={cx('message')}>
                    <span className={cx('text text-1')}>{toast?.title}</span>
                    <span className={cx('text text-2')}>Your Account Created Successfully!</span>
                  </div>
                  <BsCheckCircle className={cx('check')} />
                </div>
                <div className={cx('progress')}></div>
              </div>
            );
          })}
        </div>,
        ref.current!
      )
    : null;
};

export default Toast;
