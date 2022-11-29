import Message from './components/Message';
import { MainLayout } from '~/layouts/MainLayout';
import { bindClass } from '~/lib/classNames';
import MessageList from './components/MessageList';
import NewMessage from './components/CreateMessage';
import styles from './styles.module.scss';

const cx = bindClass(styles);
const Inbox = () => {
  return (
    <MainLayout title='Inbox'>
      <div className={cx('container')}>
        <MessageList />
        <Message />
      </div>
    </MainLayout>
  );
};

export default Inbox;
