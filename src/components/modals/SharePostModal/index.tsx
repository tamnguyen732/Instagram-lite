import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { MdOutlineClose } from 'react-icons/md';
import { RiFacebookCircleLine, RiMessengerLine, RiTwitterLine } from 'react-icons/ri';
import { TbBrandTelegram } from 'react-icons/tb';
import { CiLinkedin } from 'react-icons/ci';
import { BiLinkAlt } from 'react-icons/bi';
const cx = bindClass(styles);

const SharePostModal = () => {
  const { hideModal } = useModalContext();
  return (
    <div key={MODAL_TYPES.SHARE_POST} className={cx('container')}>
      <div className={cx('header')}>
        <span>Share to...</span>
        <MdOutlineClose
          onClick={() => hideModal(MODAL_TYPES.SHARE_POST)}
          className={cx('header-icon')}
        />
      </div>

      <ul className={cx('content')}>
        <li className={cx('social')}>
          <RiFacebookCircleLine />
          <span>Share to Facebook</span>
        </li>
        <li className={cx('social')}>
          <RiMessengerLine />
          <span>Share to Messenger</span>
        </li>
        <li className={cx('social')}>
          <RiTwitterLine />
          <span>Share to Twitter</span>
        </li>
        <li className={cx('social')}>
          <TbBrandTelegram />
          <span>Share to Telegram</span>
        </li>
        <li className={cx('social')}>
          <CiLinkedin />
          <span>Share to Linkedin</span>
        </li>
        <li className={cx('social')}>
          <BiLinkAlt />
          <span>Copy Link</span>
        </li>
        <li className={cx('action')}>
          <span>Cancel</span>
        </li>
      </ul>
    </div>
  );
};

export default SharePostModal;
