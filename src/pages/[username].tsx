import React from 'react';
import { MainLayout } from '~/layouts/MainLayout';
import UserPage from './UserPage';

const username = () => {
  return (
    <MainLayout title='Profile'>
      <UserPage />
    </MainLayout>
  );
};

export default username;
