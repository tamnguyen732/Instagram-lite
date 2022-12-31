import Button from '~/components/Button';
import Image from '~/components/Image';
import { bindClass } from '~/lib/classNames';
import { RiMoreLine } from 'react-icons/ri';
import styles from './styles.module.scss';
import { UserFragment } from '~/types/generated';
import { useFollowUser } from '~/hooks/useFollowUser';
import Loading from '~/components/Loading';
import { MODAL_TYPES, useModalContext } from '~/contexts/ModalContext';
const cx = bindClass(styles);
interface Props {
  username: string;
  user: UserFragment | undefined;
  loading?: boolean;
}

const Header = ({ user }: Props) => {
  const { showModal } = useModalContext();
  const { isFollowed, handleFollowActions, followUserLoading } = useFollowUser(user!);

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

          <Button onClick={() => handleFollowActions()} className={cx('btn')}>
            {followUserLoading ? <Loading size='sm' /> : isFollowed ? 'Followed' : 'Following'}
          </Button>
          <Button className={cx('btn')}>Message</Button>
          <RiMoreLine className={cx('icon')} />
        </div>
        <div className={cx('post')}>
          <span className={cx('text')}>
            <span className={cx('text-number')}>{user?.posts?.length}</span> Posts
          </span>
          <span className={cx('text')}>
            <span
              onClick={() => showModal(MODAL_TYPES.FOLLOWER_USER)}
              className={cx('text-number')}
            >
              {user?.followers?.length}
            </span>
            Followers
          </span>
          <span className={cx('text')}>
            <span
              onClick={() => showModal(MODAL_TYPES.FOLLOWING_USER)}
              className={cx('text-number')}
            >
              {user?.following?.length}
            </span>
            Following
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
