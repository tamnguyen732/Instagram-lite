import React, { useState } from 'react';
import { withAuth } from '~/auth';
import Button from '~/components/Button';
import FormField from '~/components/FormField';
import { SubLayout } from '~/layouts/SubLayout';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { validationSchema, ValidationSchema } from './formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { logo } from '~/assets/images';
import Image from '~/components/Image';
import { useRouter } from 'next/router';
import {
  ChangePasswordInput,
  useChangePasswordMutation,
  useLogoutMutation
} from '~/types/generated';
import { string } from 'zod';
import { toast } from 'react-toastify';
import Loading from '~/components/Loading';
const cx = bindClass(styles);
const changePassword = () => {
  const router = useRouter();
  const [changePassword, { data, loading, error }] = useChangePasswordMutation();
  const [logout] = useLogoutMutation();
  console.log(data);
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

      const success = response.data?.changePassword.success;

      if (success) {
        toast.success('Your password has been updated successfully');
      }

      await logout();
      setTimeout(() => {
        router.push('/login');
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SubLayout title='Change Password'>
      <div className={cx('container')}>
        <h2 className={cx('text')}>Reset Password</h2>
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

// export const getServerSideProps = withAuth({ isProtected: true });
