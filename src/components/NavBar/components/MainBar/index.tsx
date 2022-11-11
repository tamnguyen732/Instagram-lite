import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { navBarAction } from '../action';
import Link from 'next/link';
import Image from '~/components/Image';
import { logo } from '~/assets/images';
import { useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { ROUTES } from '~/constants/routes';
import { IconType } from 'react-icons';
const cx = bindClass(styles);

interface NavProps {
  subBarActive: boolean;
  setSubBarActive: (subBarActive: boolean) => void;
  setTitle: (title: string) => void;
}
interface Navbar {
  title: string;
  icon: IconType;
  hasChild: boolean;
  route?: string | undefined;
  active: boolean;
}
const MainBar = ({ setSubBarActive, subBarActive, setTitle }: NavProps) => {
  const [idx, setIdx] = useState<number>(0);
  const handleEvent = (idx: number, nav: Navbar) => {
    if (nav.hasChild) {
      setSubBarActive(nav.hasChild);
    } else {
      setSubBarActive(false);
    }
    setTitle(nav.title);
    setIdx(idx);
  };

  return (
    <div className={cx('container', subBarActive ? 'active' : '')}>
      {!subBarActive && <Image src={logo.src} alt='instagram-logo' className={cx('image')} />}

      <ul className={cx('list', subBarActive ? 'active-list' : '')}>
        {subBarActive ? (
          <li className={cx('item', subBarActive ? 'active-item' : '')}>
            <Link href={ROUTES.HOME}>
              <BsInstagram className={cx('icon')} onClick={() => setSubBarActive(!subBarActive)} />
            </Link>
          </li>
        ) : (
          ''
        )}
        {navBarAction.map((nav, index) => {
          return (
            <li
              className={cx('item', subBarActive ? 'active-item' : '')}
              onClick={() => {
                handleEvent(index, nav);
              }}
            >
              <Link href={nav.route ? nav.route : ''}>
                <nav.icon className={cx('icon')} onClick={() => setSubBarActive(!subBarActive)} />
              </Link>
              {nav.route ? (
                <Link
                  className={cx('title', index === idx ? 'active' : '', subBarActive ? 'none' : '')}
                  href={nav.route}
                >
                  {nav.title}
                </Link>
              ) : (
                <span
                  className={cx('title', index === idx ? 'active' : '', subBarActive ? 'none' : '')}
                >
                  {nav.title}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainBar;
