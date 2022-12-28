import React from 'react';
import { withAuth } from '~/auth';
import { MainLayout } from '~/layouts/MainLayout';
import UserPage from './userPage';

const username = () => {
  return (
    <MainLayout title='Profile'>
      <UserPage />
    </MainLayout>
  );
};

export default username;

export const getServerSideProps = withAuth({ isProtected: true });
