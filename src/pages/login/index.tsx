import React from 'react';
import LoginImages from '~/pages/login/components/LoginImages/';
import { MainLayout } from '~/layouts/SubLayout';
import LoginForm from './components/LoginForm';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
const cx = bindClass(styles);
const login = () => {
  return (
    <MainLayout title='Login'>
      <div className={cx('container')}>
        <LoginImages />
        <LoginForm />
      </div>
    </MainLayout>
  );
};

export default login;
