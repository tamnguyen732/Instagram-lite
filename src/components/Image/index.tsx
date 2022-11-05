import classNames from 'classnames';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

import { bindClass } from '~/lib/classnames';

import styles from './styles.module.scss';

type BaseImageProps = DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

interface ImageProps extends BaseImageProps {
  alt: string;
  objectFit?: 'cover' | 'contain';
  rounded?: boolean;
  classname?: string;
}
const cx = bindClass(styles);
const Image = ({ alt = '', objectFit = 'cover', className, rounded, ...rest }: ImageProps) => {
  return (
    <div className={cx(className)}>
      <img
        className={cx(
          {
            'object-fit-cover': objectFit === 'cover',
            'object-fit-contain': objectFit === 'contain'
          },
          {
            rounded
          }
        )}
        {...rest}
        alt={alt}
        draggable={false}
      />
    </div>
  );
};

export default Image;
