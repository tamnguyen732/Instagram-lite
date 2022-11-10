import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { navBarAction } from '../action';
import Link from 'next/link';
const cx = bindClass(styles);

const MainBar = () => {
  return (
    <div className={cx('container')}>
      {navBarAction.map((nav) => {
        return (
          <ul key={nav.title} className={cx('list')}>
            <li className={cx('item')}>
              <nav.icon className={cx('icon')} />
              {nav.route ? (
                <Link className={cx('title')} href={nav.route}>
                  {nav.title}
                </Link>
              ) : (
                <span className={cx('title')}>{nav.title}</span>
              )}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default MainBar;
