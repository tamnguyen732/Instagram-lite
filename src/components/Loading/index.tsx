import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
const cx = bindClass(styles);

interface LoadingProp {
  className?: string;
  size: 'sm' | 'md' | 'lg';
}
const Loading = ({ className, size, ...rest }: LoadingProp) => {
  return (
    <div
      {...rest}
      className={cx('spinner', className, {
        small: size === 'sm',
        medium: size === 'md',
        large: size === 'lg'
      })}
    >
      <div className={cx('bar1')}></div>
      <div className={cx('bar2')}></div>
      <div className={cx('bar3')}></div>
      <div className={cx('bar4')}></div>
      <div className={cx('bar5')}></div>
      <div className={cx('bar6')}></div>
      <div className={cx('bar7')}></div>
      <div className={cx('bar8')}></div>
      <div className={cx('bar9')}></div>
      <div className={cx('bar10')}></div>
      <div className={cx('bar11')}></div>
      <div className={cx('bar12')}></div>
    </div>
  );
};

export default Loading;
