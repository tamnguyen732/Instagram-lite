import Button from '~/components/Button';
import Image from '~/components/Image';
import { bindClass } from '~/lib/classNames';
import { RiMoreLine } from 'react-icons/ri';
import styles from './styles.module.scss';
import { UserFragment } from '~/types/generated';
import { useEffect, useState } from 'react';
import { useAuthSelector } from '~/redux/selector';
const cx = bindClass(styles);
interface Props {
  username: string;
  user: UserFragment | undefined;
  loading?: boolean;
}

const Header = ({ user, username }: Props) => {
  const { currentUser } = useAuthSelector();
  const [followed, setFollowed] = useState<boolean>(false);
  useEffect(() => {
    if (currentUser?.following?.length) {
      const isFollowed = currentUser?.following?.some((user) => user.username === username);
      console.log(isFollowed);
      if (isFollowed) {
        setFollowed(true);
      }
    }
  }, [username, currentUser]);
  return (
    <div className={cx('container')}>
      <Image
        className={cx('image')}
        src={'https://zipmex.com/static/d1af016df3c4adadee8d863e54e82331/Twitter-NFT-profile.jpg'}
        alt='profile'
        rounded
      />
      <div className={cx('info')}>
        <div className={cx('name')}>
          <span>{user?.username}</span>
          <Button className={cx('btn')}>{followed ? 'Followed' : 'Following'}</Button>
          <Button className={cx('btn')}>Message</Button>
          <RiMoreLine className={cx('icon')} />
        </div>
        <div className={cx('post')}>
          <span className={cx('text')}>
            <span className={cx('text-number')}>{user?.posts?.length}</span> Posts
          </span>
          <span className={cx('text')}>
            <span className={cx('text-number')}>{user?.followers?.length}</span> Followers
          </span>
          <span className={cx('text')}>
            <span className={cx('text-number')}>{user?.following?.length}</span> Following
          </span>
        </div>
        <p> Bienvenidos a Welcome to the official Leo Messi Instagram account</p>
        {user?.following?.length && (
          <span>
            <span>
              {user?.following?.length &&
                `${user?.following[0]?.username}, ${user?.following[1]?.username}`}
            </span>
            and 10 other people are following
          </span>
        )}
      </div>
    </div>
  );
};

export default Header;
