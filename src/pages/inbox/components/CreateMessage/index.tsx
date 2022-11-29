import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { SlCursor } from 'react-icons/sl';
import { GiCircle } from 'react-icons/gi';
import Button from '~/components/Button';
const cx = bindClass(styles);
const NewMessage = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('icons')}>
        <SlCursor />
        <GiCircle />
      </div>
      <span className={cx('text1')}>Your message</span>
      <span className={cx('text2')}>Send private message to your friends</span>
      <Button className={cx('btn')} primary size='sm'>
        Send Message
      </Button>
    </div>
  );
};

export default NewMessage;
