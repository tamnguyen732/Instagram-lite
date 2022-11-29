import { bindClass } from '~/lib/classNames';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const Message = () => {
  return (
    <div className={cx('container')}>
      <Header />
      <Content />
      <Footer/>
    </div>
  );
};

export default Message;
