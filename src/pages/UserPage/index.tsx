import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { bindClass } from '~/lib/classNames';
import { useGetSingleUserLazyQuery, UserFragment } from '~/types/generated';
import Footer from './components/Footer';
import Header from './components/Header';

import styles from './styles.module.scss';
const cx = bindClass(styles);

const UserPage = () => {
  const [getSingleUser, { loading }] = useGetSingleUserLazyQuery();

  const [user, setUser] = useState<UserFragment>();
  const router = useRouter();
  const username = router!.query.username as string;

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        if (username) {
          const response = await getSingleUser({ variables: { username } });

          const singleUser = response.data!.getSingleUser.user;
          if (!singleUser) {
            return;
          }
          setUser(singleUser);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSingleUser();
  }, [username]);

  return (
    <div className={cx('container')}>
      <Header user={user} loading={loading} username={username} />
      <Footer />
    </div>
  );
};

export default UserPage;
