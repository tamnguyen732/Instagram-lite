import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { RefObject, forwardRef } from 'react';
import SearchUser from './components/SearchUsers';
import Notification from './components/Notification';
const cx = bindClass(styles);
interface NavProps<T extends HTMLElement = HTMLDivElement> {
  subBarActive: boolean;
  setSubBarActive?: (subBarActive: boolean) => void;
  title: string;
  ref: RefObject<T>;
}
const SubBar = forwardRef<any, NavProps>(({ subBarActive, title }, ref) => {
  return (
    <div ref={ref} className={cx('container', subBarActive ? 'active' : '')}>
      {title === 'Search' ? <SearchUser /> : <Notification />}
    </div>
  );
});

export default SubBar;
