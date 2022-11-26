import { DetailedHTMLProps } from 'react';
import { bindClass } from '~/lib/classNames';
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
  profile?: boolean;
}
const cx = bindClass(styles);
const Image = ({
  alt = '',
  objectFit = 'cover',
  className,
  rounded,
  profile,
  ...rest
}: ImageProps) => {
  return (
    <div className={cx(className)}>
      <img
        className={cx(
          {
            'object-fit-cover': objectFit === 'cover',
            'object-fit-contain': objectFit === 'contain'
          },
          {
            rounded,
            profile
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
