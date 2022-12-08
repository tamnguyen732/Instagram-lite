import { withAuth } from '~/auth';
import { MainLayout } from '~/layouts/MainLayout';

import HomePage from './home';
import Friends from './home/components/Friends';

const Home = () => {
  return (
    <MainLayout title='Home'>
      <HomePage />
      <Friends />
    </MainLayout>
  );
};
export default Home;

export const getServerSideProps = withAuth({ isProtected: true });
