import { MODAL_TYPES } from '~/constants/modal';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { FaFacebook } from 'react-icons/fa';
import { EmailShareButton, FacebookShareButton } from 'react-share';
const cx = bindClass(styles);

const MessageModal = () => {
  return (
    <>
      <div key={MODAL_TYPES.NEW_MESSAGE} className={cx('container')}>
        <div className={cx('wrapper')}>
          <FacebookShareButton
            children={<FaFacebook className={cx('icon')} />}
            url='www.google.com'
            quote='talk about it'
            hashtag='forwardedRef'
          />
        </div>
      </div>
    </>
  );
};
export default MessageModal;
