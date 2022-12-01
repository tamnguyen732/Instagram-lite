import { useState } from 'react';
import FormField from '~/components/FormField';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Image from '~/components/Image';
import { logo } from '~/assets/images';
import { FaFacebookSquare } from 'react-icons/fa';
import Button from '~/components/Button';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema, ValidationSchema } from './formValidation';
import { LoginInput, useLoginMutation } from '~/types/generated';

const cx = bindClass(styles);

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const [loginUser, { data, loading, error }] = useLoginMutation();
  console.log(data);
  const onSubmit = async (data: LoginInput) => {
    const response = await loginUser({
      variables: { LoginInput: data }
    });

    const message = response.data?.login.message;
    if (message) {
      if (message?.includes('password')) {
        setError('password', { message });
      } else {
        setError('username', { message });
      }
    }
  };
  return (
    <div className={cx('main')}>
      <div className={cx('container')}>
        <Image className={cx('img')} src={logo.src} alt='instagram-logo' />
        <form className='wrapper' onSubmit={handleSubmit(onSubmit)}>
          <div className='inputs'>
            <FormField placeholder='Username' register={register('username')} errors={errors} />
            <FormField
              type='password'
              placeholder='Password'
              register={register('password')}
              errors={errors}
            />
          </div>
          <Button className={cx('button')} primary size='lg' type='submit'>
            Log In
          </Button>
          <div className={cx('con')}>
            <hr className={cx('hr')} />
            <span className={cx('or')}>OR</span>
          </div>
          <div className={cx('wrapper-login')}>
            <div className={cx('facebook-login')}>
              <FaFacebookSquare className={cx('icon')} />
              <span className={cx('login')}>Log in with facebook</span>
            </div>
            <span className={cx('forgot-password')}>forgot password?</span>
          </div>
        </form>
      </div>
      <div className={cx('wrapper-register')}>
        <span>You don't have an account?</span>
        <Link href={'#'}>Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
