import { bindClass } from '~/lib/classNames';
import Footer from './components/Footer';

import Header from './components/Header';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const UserPage = () => {
  return (
    <div className={cx('container')}>
      <Header />
      <Footer />
    </div>
  );
};

export default UserPage;
