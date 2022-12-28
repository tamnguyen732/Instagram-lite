import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDebounce } from '~/hooks/useDebounce';
import Profile from '~/components/Profile';
import fetchSearchUser from './fetchSearchUser';
import { useIntersectionObserver } from '~/hooks/useIntersectionObserver';
import Loading from '~/components/Loading';
import Link from 'next/link';
const cx = bindClass(styles);
const SearchUser = () => {
  const [search, setSearch] = useState<string>('');
  const debounceValue = useDebounce(search, 1000);

  const { observerRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '40px'
  });
  const { users, setPage, hasMore, loading } = fetchSearchUser(debounceValue);

  useEffect(() => {
    if (isIntersecting && hasMore) {
      setPage((page) => page + 1);
    }
  }, [isIntersecting, hasMore]);

  return (
    <div className={cx('container')}>
      <h3>Search</h3>
      <div className={cx('input-wrapper')}>
        <input
          value={search}
          className={cx('input')}
          placeholder='Search'
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <Loading size='md' className={cx('loading1')} />
        ) : (
          <AiOutlineCloseCircle className={cx('icon')} onClick={() => setSearch('')} />
        )}
      </div>

      <hr className={cx('hr')} />
      {loading && <Loading size='md' className={cx('loading2')} />}
      {!search ? (
        <>
          <h3 className={cx('recently')}>Recently</h3>
          <p className={cx('recently')}>No content was found recently</p>
        </>
      ) : users.length ? (
        <ul className={cx('user-list')}>
          {users?.map((user) => {
            return (
              <li key={user.id} className={cx('user')}>
                <Link href={user.username}>
                  <Profile
                    className={cx('profile')}
                    name={user.username}
                    subText={user.username}
                    src='https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'
                    alt='profile'
                  />
                </Link>
              </li>
            );
          })}
          <div ref={observerRef} />
        </ul>
      ) : null}
    </div>
  );
};
export default SearchUser;
