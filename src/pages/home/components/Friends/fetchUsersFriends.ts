import { useEffect, useState } from 'react';
import { userAction } from '~/redux/slices/userSlice';
import { useStoreDispatch } from '~/redux/store';
import { useGetUsersLazyQuery, User } from '~/types/generated';

const PAGE = 1;
const PAGE_LIMIT = 5;

type fetchUsersReturn = () => {
  randomUsers: User[];
  loading: boolean;
};
const fetchUsersFriends: fetchUsersReturn = () => {
  const dispatch = useStoreDispatch();
  const [randomUsers, setRandomUsers] = useState<User[]>([]);
  const [getUsers, { loading, error }] = useGetUsersLazyQuery();

  const chooseRandom = (arr: User[], num = 1) => {
    const users = [];
    for (let i = 0; i < num; ) {
      const random = Math.floor(Math.random() * arr.length);
      if (users.indexOf(arr[random]) !== -1) {
        continue;
      }
      users.push(arr[random]);
      i++;
    }
    return users;
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await getUsers({ variables: { page: PAGE, limitPerPage: PAGE_LIMIT } });
        const users = response.data?.getUsers.paginatedUsers;
        dispatch(userAction.setUsers(users as User[]));
        if (users?.length) {
          const randomUsers = chooseRandom(users, 5);
          setRandomUsers(randomUsers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriends();
  }, []);

  return { randomUsers, loading };
};

export default fetchUsersFriends;
