import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Feed from './components/Feed';
import Stories from './components/Story';

const cx = bindClass(styles);
const Home = () => {
  return (
    <div className={cx('container')}>
      <Stories />
      <Feed />
    </div>
  );
};

export default Home;
