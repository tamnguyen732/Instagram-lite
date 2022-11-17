import { createPortal } from 'react-dom';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { BiErrorCircle } from 'react-icons/bi';
import { BsCheckCircle } from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { getToasts } from '~/hooks/useToast';
const cx = bindClass(styles);

const Toast = () => {
  const toasts = getToasts();
  const [mounted, setMounted] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#root');
    setMounted(true);
    let timeoutId = setTimeout(() => {
      setActive(true);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [active]);

  return mounted && ref.current
    ? createPortal(
        <div className={cx('container')}>
          {toasts?.map(({ message, type }) => {
            return (
              <div className={cx('toast', active ? 'active' : '')}>
                <div className={cx('toast-content')}>
                  <div className={cx('message')}>
                    <span className={cx(type === 'success' ? 'text' : 'text2')}>{message}</span>
                  </div>
                  {type === 'success' ? (
                    <BsCheckCircle className={cx(type === 'success' ? 'check' : 'check2')} />
                  ) : (
                    <BiErrorCircle className={cx('check2')} />
                  )}
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
