import { zodResolver } from '@hookform/resolvers/zod';
import { withAuth } from '~/auth';
import Button from '~/components/Button';
import FormField from '~/components/FormField';
import { SubLayout } from '~/layouts/SubLayout';
import { bindClass } from '~/lib/classNames';
import { useForgotPasswordMutation } from '~/types/generated';
import { validationSchema, ValidationSchema } from './formValidation';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Loading from '~/components/Loading';
import { TbLock } from 'react-icons/tb';
const cx = bindClass(styles);
const forgotPassword = () => {
  const router = useRouter();
  const [forgotPasswordFetch, { loading }] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = async (data: ValidationSchema) => {
    const { email } = data;
    const response = await forgotPasswordFetch({ variables: { forgotPassword: email } });

    const success = response.data?.forgotPassword.success;
    if (success) {
      toast.success('We have sent you an email');
    }
  };
  return (
    <SubLayout title='Forgot Password'>
      <div className={cx('container')}>
        <TbLock className={cx('icon')} />
        <h4 className={cx('text')}>Forgot Password?</h4>
        <p className={cx('text2')}>We will send ou an email for confirmation to reset password</p>
        <form className='wrapper' onSubmit={handleSubmit(onSubmit)}>
          <div className={cx('inputs')}>
            <FormField
              className={cx('input')}
              type='text'
              placeholder='Email'
              register={register('email')}
              errors={errors}
            />
          </div>
          <Button className={cx('button')} primary size='lg' type='submit'>
            {loading ? <Loading size='sm' className='loading' /> : ' Submit'}
          </Button>
        </form>
        <span className={cx('go-back')} onClick={() => router.back()}>
          Go Back
        </span>
      </div>
    </SubLayout>
  );
};

export default forgotPassword;

export const getServerSideProps = withAuth({ isProtected: false });
