import React from 'react';
import LoginImages from '~/pages/login/components/LoginImages/';
import { MainLayout } from '~/layouts/MainLayout';
import LoginForm from './components/LoginForm';
import { bindClass } from '~/lib/classnames';
import styles from './styles.module.scss';
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
