import { DetailedHTMLProps, ReactNode } from 'react';

import { bindClass } from '~/lib/classNames';

import styles from './styles.module.scss';

const cx = bindClass(styles);

type ButtonBaseProps = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends ButtonBaseProps {
  children: ReactNode;
  className?: string;
  primary?: boolean;
  light?: boolean;
  dark?: boolean;
  outline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  danger?: boolean;
  onClick?: () => void;
}

const Button = ({
  children,
  light,
  dark,
  className,
  primary,
  danger,
  size,
  outline,
  onClick,
  ...rest
}: Props) => {
  return (
    <button
      onClick={onClick}
      className={cx('btn', className, {
        light,
        dark,
        primary,
        danger,
        outline,
        small: size === 'sm',
        medium: size === 'md',
        large: size === 'lg'
      })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
