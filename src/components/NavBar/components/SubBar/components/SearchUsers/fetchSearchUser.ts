import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFindUsersLazyQuery, UserFragment } from '~/types/generated';

const PAGE = 1;
const LIMIT_SEARCH = 4;

type SearchUserReturn = (debounceValue: string) => {
  loading: boolean;
  users: UserFragment[];
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean | null | undefined;
};

const fetchSearchUser: SearchUserReturn = (debounceValue: string) => {
  const [page, setPage] = useState<number>(PAGE);
  const [users, setUsers] = useState<UserFragment[]>([]);
  const [searchUser, { data, loading }] = useFindUsersLazyQuery();
  const hasMore = data?.findUsers.hasMore;
  useEffect(() => {
    setUsers([]);
    setPage(PAGE);
  }, [debounceValue]);
  useEffect(() => {
    const findUser = async () => {
      try {
        if (debounceValue) {
          const response = await searchUser({
            variables: {
              FindUsersInput: { page, limitPerPage: LIMIT_SEARCH, searchQuery: debounceValue }
            }
          });
          const newUser = response.data?.findUsers.paginatedUsers;

          if (newUser?.length) {
            setUsers((prev) => {
              return [...new Set([...prev, ...newUser])];
            });
          }
        }
        if (!debounceValue) {
          setUsers([]);
          setPage(PAGE);
        }
      } catch (error) {
        console.log(error);
      }
    };

    findUser();
  }, [debounceValue, page]);

  return { loading, users, setPage, hasMore };
};

export default fetchSearchUser;
