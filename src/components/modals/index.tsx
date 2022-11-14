import { ReactNode, useEffect, useState } from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';

const cx = bindClass(styles);
interface Modal {
  openModal: () => void;
}
interface Props {
  children: (args: Modal) => ReactNode;
  element: ReactNode;
}

const Modal = ({ element, children }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => {
    setOpen(true);
  };

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if ((e.target as null | Element)?.closest('[data-close-modal]')) setOpen(false);
    };
    window.addEventListener('click', closeModal);
    return () => window.removeEventListener('click', closeModal);
  }, []);
  return open ? (
    <>
      {children({ openModal })}
      <div className={cx('container')}>
        <div className={cx('overlay')}></div>

        <div className={cx('content')}>{element}</div>
      </div>
      ;
    </>
  ) : null;
};
export default Modal;
