import { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';
import {
  emptyScreenshot,
  screenshot1,
  screenshot2,
  screenshot3,
  screenshot4
} from '~/assets/images';
import Image from '~/components/Image';
import { bindClass } from '~/lib/classnames';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const LoginImages = () => {
  const [visibleIndex, setVisibleIndex] = useState<number>(0);
  const screenshots = [screenshot1, screenshot2, screenshot3, screenshot4];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prevIndex) => (prevIndex >= screenshots.length - 1 ? 0 : prevIndex + 1));
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={cx('container')}>
      <div className={cx('main')}>
        <Image className={cx('img1')} src={emptyScreenshot.src} alt='backround-instagram-images' />

        {screenshots.map((screen, index) => {
          return (
            <Image
              className={cx('img2', index === visibleIndex ? 'active' : '')}
              src={screen.src}
              key={screen.src}
              alt='login-screenshot'
            />
          );
        })}
      </div>
    </div>
  );
};

export default LoginImages;
