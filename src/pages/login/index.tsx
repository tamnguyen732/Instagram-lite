import React from 'react';
import LoginImages from '~/pages/login/components/LoginImages/';
import { SubLayout } from '~/layouts/SubLayout';
import LoginForm from './components/LoginForm';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { GetServerSideProps } from 'next';
const cx = bindClass(styles);
const login = () => {
  return (
    <SubLayout title='Login'>
      <div className={cx('container')}>
        <LoginImages />
        <LoginForm />
      </div>
    </SubLayout>
  );
};

export default login;
