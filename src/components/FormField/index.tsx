import { ChangeEvent, MutableRefObject, forwardRef, InputHTMLAttributes } from 'react';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
interface Props {
  register?: UseFormRegisterReturn;
  placeholder?: string;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  errors: {
    [x: string]: any;
  };
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const cx = bindClass(styles);
const FormField = ({ errors, register, placeholder, type = 'text', className }: Props) => {
  const errorMessage = errors[register?.name]?.message;
  return (
    <>
      <input
        {...register}
        type={type}
        className={cx('input', className, {})}
        placeholder={placeholder}
      />
      {errorMessage && <span className={cx('errors')}>{errorMessage}</span>}
    </>
  );
};

export default FormField;
