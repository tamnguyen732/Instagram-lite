import { bindClass } from '~/lib/classNames';
import Message from './components/Message';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const Content = () => {
  return (
    <div className={cx('container')}>
      <span> Sunday 10 Pm</span>
      <div className={cx('message-wrapper')}>
        <Message ownMessage />
        <Message />
        <Message />
      </div>
    </div>
  );
};

export default Content;
