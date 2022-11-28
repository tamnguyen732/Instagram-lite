import { MainLayout } from '~/layouts/MainLayout';
import { bindClass } from '~/lib/classNames';
import Header from './components/Header';
import Footer from './components/Footer';

import styles from './styles.module.scss';

const cx = bindClass(styles);
const PostDetail = () => {
  return (
    <>
      <MainLayout title='PostDetail'>
        <div className={cx('container')}>
          <Header />
          <hr className={cx('hr')} />
          <Footer />
        </div>
      </MainLayout>
    </>
  );
};

export default PostDetail;
