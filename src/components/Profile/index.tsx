import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';

import Image from '~/components/Image';
interface Props {
  name: string;
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
  subText?: string;
}

const cx = bindClass(styles);
const Profile = ({ name, src, alt, onClick, className, subText }: Props) => {
  return (
    <div onClick={onClick} className={cx('container', className)}>
      <Image className={cx('avatar')} src={src} alt={alt} objectFit='cover' profile />
      <div className={cx('name-wrapper')}>
        <span className={cx('name')}>{name}</span>
        <span className={cx('location')}>{subText}</span>
      </div>
    </div>
  );
};

export default Profile;
