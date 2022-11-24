import { ChangeEvent, MutableRefObject, forwardRef } from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
interface Props {
  value: string;
  placeholder?: string;
  className?: string;
  ref: MutableRefObject<any>;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const cx = bindClass(styles);
const FormField = forwardRef<any, Props>(
  ({ value, placeholder, className, onChange, ...rest }, ref) => {
    return (
      <input
        {...rest}
        ref={ref}
        className={cx('input', className, {})}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
);

export default FormField;
