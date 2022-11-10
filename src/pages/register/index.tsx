import React from 'react';
import { MainLayout } from '~/layouts/MainLayout';
import { bindClass } from '~/lib/classNames';
import RegisterForm from './RegisterForm';
import styles from './styles.module.scss';

const cx = bindClass(styles);
const register = () => {
  return (
    <MainLayout title='Register'>
      <div className={cx('container')}>
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default register;
