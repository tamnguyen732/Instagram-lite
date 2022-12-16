import { useRouter } from 'next/router';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
import { bindClass } from '~/lib/classNames';
import { useLogoutMutation } from '~/types/generated';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const LogoutModal = () => {
  const { hideModal, modalsType } = useModalContext();
  const router = useRouter();
  const [logout, { data, loading, error }] = useLogoutMutation();

  console.log(data);
  const handleLogout = async () => {
    hideModal(modalsType);
    await logout();

    router.push('/login');
  };
  return (
    <div key={MODAL_TYPES.LOGOUT} className={cx('container')}>
      <div className={cx('overlay')} />
      <div className={cx('content')}>
        <div className={cx('wrapper')}>
          <div className={cx('header')}>
            <h4>Log Out?</h4>
            <span>Do you want to logout?</span>
          </div>
          <div className={cx('action')}>
            <span onClick={handleLogout} className={cx('text1')}>
              Logout
            </span>
            <span onClick={() => hideModal(MODAL_TYPES.LOGOUT)} className={cx('text2')}>
              Cancel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
