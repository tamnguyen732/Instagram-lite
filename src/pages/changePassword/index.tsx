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
const cx = bindClass(styles);
const changePassword = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = () => {};
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
            {/* {loading ? <Loading size='sm' className='loading' /> : ' Log In'} */}
            Change Password
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
