import React from 'react';
import { withAuth } from '~/auth';
import { SubLayout } from '~/layouts/SubLayout';
import { bindClass } from '~/lib/classNames';
import RegisterForm from './RegisterForm';
import styles from './styles.module.scss';

const cx = bindClass(styles);
const register = () => {
  return (
    <SubLayout title='Register'>
      <div className={cx('container')}>
        <RegisterForm />
      </div>
    </SubLayout>
  );
};

export default register;
export const getServerSideProps = withAuth({ isProtected: false });
