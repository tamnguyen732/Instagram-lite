import React, { useEffect, useRef } from 'react';
import { withAuth } from '~/auth';
import Button from '~/components/Button';
import FormField from '~/components/FormField';
import { SubLayout } from '~/layouts/SubLayout';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { validationSchema, ValidationSchema } from './formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useChangePasswordMutation, useLogoutMutation } from '~/types/generated';
import { toast } from 'react-toastify';
import { TbLock } from 'react-icons/tb';
import Loading from '~/components/Loading';
const cx = bindClass(styles);
const changePassword = () => {
  const router = useRouter();
  const [changePassword, { loading }] = useChangePasswordMutation();
  const [logout] = useLogoutMutation();
  const timerRef = useRef<any | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = async (info: ValidationSchema) => {
    const { password } = info;
    const { token, userId } = router.query;
    const newToken = token as string;
    if (!token || !userId) return;
    try {
      const data = { password, token: newToken, userId: Number(userId) };
      const response = await changePassword({
        variables: { changePasswordInput: data }
      });

      const { success, message } = response.data!.changePassword;

      if (success) {
        toast.success('Your password has been updated successfully');
        await logout();
        timerRef.current = setTimeout(() => {
          router.push('/login');
        }, 500);
      } else {
        if (message) {
          setError('confirmPassword', { message });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <SubLayout title='Change Password'>
      <div className={cx('container')}>
        <TbLock className={cx('icon')} />
        <h4 className={cx('text')}>Reset Password</h4>
        <form className='wrapper' onSubmit={handleSubmit(onSubmit)}>
          <div className={cx('inputs')}>
            <FormField
              className={cx('input')}
              type='password'
              placeholder='Password'
              register={register('password')}
              errors={errors}
            />
            <FormField
              className={cx('input')}
              type='password'
              placeholder='Confirm Password'
              register={register('confirmPassword')}
              errors={errors}
            />
          </div>
          <Button className={cx('button')} primary size='lg' type='submit'>
            {loading ? <Loading size='sm' className='loading' /> : '  Change Password'}
          </Button>
        </form>
        <span className={cx('go-back')} onClick={() => router.back()}>
          Go Back
        </span>
      </div>
    </SubLayout>
  );
};

export default changePassword;

export const getServerSideProps = withAuth({ isProtected: false });
