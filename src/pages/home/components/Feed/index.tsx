import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Header from './components/Header';
import Footer from './components/Footer';

const cx = bindClass(styles);
const Feed = () => {
  return (
    <div className={cx('container')}>
      <Header />
      <Footer />
    </div>
  );
};

export default Feed;
