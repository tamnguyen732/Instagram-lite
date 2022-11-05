import { ChangeEvent, useState } from 'react';
import { bindClass } from '~/lib/classnames';
import styles from './styles.module.scss';
interface Props {
  value: string;
  placeholder: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const cx = bindClass(styles);
const FormField = ({ value, placeholder, className, onChange, ...rest }: Props) => {
  return (
    <input
      {...rest}
      className={cx('input', className, {})}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default FormField;
