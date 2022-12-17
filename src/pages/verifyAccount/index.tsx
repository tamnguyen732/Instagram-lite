import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { withAuth } from '~/auth';
import Button from '~/components/Button';
import FormField from '~/components/FormField';
import mapError from '~/helpers/mapErrors';
import { SubLayout } from '~/layouts/SubLayout';
import { bindClass } from '~/lib/classNames';
import { useAuthSelector } from '~/redux/selector';
import { authAction } from '~/redux/slices/authSlice';
import { useStoreDispatch } from '~/redux/store';
import { useRegisterMutation } from '~/types/generated';
import styles from './styles.module.scss';
import { useForm } from 'react-hook-form';
import { validationSchema, ValidationSchema } from './formValidation';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { HiOutlineMail } from 'react-icons/hi';
import Link from 'next/link';
const cx = bindClass(styles);
const verifyAcount = () => {
  const [code, setCode] = useState<string>('');
  const { toVerifyUser } = useAuthSelector();
  const [newError, setNewError] = useState<string>('');
  const dispatch = useStoreDispatch();
  const router = useRouter();
  const [registerUser, { data, loading, error }] = useRegisterMutation();
  console.log(data);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit = async (code: ValidationSchema) => {
    const data = { ...toVerifyUser, verifyCode: +code! };
    const response = await registerUser({
      variables: { registerInput: data }
    });
    const { success, errors, user } = response.data!.register;
    if (errors?.length) {
      const { message } = mapError(errors);
      if (message) {
        setError('code', { message });
      }
    }
    if (success) {
      toast.success('Register successfully');
    }
    if (user) {
      dispatch(authAction.setCurrentUser(user));
      dispatch(authAction.setIsLoggedIn(true));
      router.push('/');
    }
  };
  return (
    <SubLayout title='Verify Password'>
      <div className={cx('main')}>
        <div className={cx('container')}>
          <HiOutlineMail className={cx('icon')} />
          <h4 className={cx('text')}>Receive Verification Code</h4>

          <p className={cx('text2')}>
            We have sent the code to your email. <span>Send code again.</span>
          </p>

          <form className='wrapper' onSubmit={handleSubmit(onSubmit)}>
            <div className={cx('inputs')}>
              <FormField
                className={cx('input')}
                type='text'
                placeholder='Enter Code'
                register={register('code')}
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
        <div className={cx('wrapper-login')}>
          <span>Do you have an account?</span>
          <Link href={'/login'}>Log In</Link>
        </div>
      </div>
    </SubLayout>
  );
};
export default verifyAcount;
// export const getServerSideProps = withAuth({ isProtected: true });
