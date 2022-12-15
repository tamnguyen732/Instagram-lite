import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
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
import Link from 'next/link';
const cx = bindClass(styles);
const forgotPassword = () => {
  const router = useRouter();
  // const [forgotPasswordFetch, { data, loading, error }] = useForgotPasswordMutation();
  // console.log(data);
  // const handleSubmit = async () => {
  //   await forgotPasswordFetch({ variables: { forgotPassword: email } });
  // };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = () => {};
  return (
    <SubLayout title='Forgot Password'>
      <div className={cx('container')}>
        <h2 className={cx('text')}>Forgot Password</h2>
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
            {/* {loading ? <Loading size='sm' className='loading' /> : ' Log In'} */}
            Submit
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

export const getServerSideProps = withAuth({ isProtected: true });
