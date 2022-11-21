import { useEffect, useRef, useState } from 'react';
import useClickOutside from '~/hooks/useClickOutside';
import MainBar from './components/MainBar';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import SubBar from './components/SubBar/SubBar';
import { useModalContext } from '~/contexts/ModalContext';
const cx = bindClass(styles);
const NavBar = () => {
  const { modalsType } = useModalContext();
  const [subBarActive, setSubBarActive] = useState<boolean>(false);
  const mainbarRef = useRef<HTMLDivElement>(null);
  const subbarRef = useRef<HTMLDivElement>(null);

  useClickOutside([subbarRef, mainbarRef], () => setSubBarActive(false));

  useEffect(() => {
    const isMeetConditions = modalsType.length && mainbarRef.current !== null;
    if (isMeetConditions) {
      mainbarRef!.current!.style.backgroundColor = 'unset';
    }
    return () => {
      if (isMeetConditions) {
        mainbarRef.current.style.backgroundColor = '#fff';
      }
    };
  }, [mainbarRef.current, modalsType.length]);
  const [title, setTitle] = useState<string>('');
  return (
    <div className={cx('container')}>
      <MainBar
        ref={mainbarRef}
        setSubBarActive={setSubBarActive}
        subBarActive={subBarActive}
        setTitle={setTitle}
      />
      <SubBar ref={subbarRef} subBarActive={subBarActive} title={title} />
    </div>
  );
};

export default NavBar;
