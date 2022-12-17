import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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
import { LoginInput, useLoginFacebookMutation, useLoginMutation } from '~/types/generated';
import mapError from '~/helpers/mapErrors';
import { useStoreDispatch } from '~/redux/store';
import Loading from '~/components/Loading';
import { authAction } from '~/redux/slices/authSlice';
import { useRouter } from 'next/router';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
const cx = bindClass(styles);

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });
  const dispatch = useStoreDispatch();
  const router = useRouter();
  const [loginUser, { loading }] = useLoginMutation();
  const [loginFacebook] = useLoginFacebookMutation();
  const onSubmit = async (data: LoginInput) => {
    const response = await loginUser({
      variables: { LoginInput: data }
    });
    const { errors, user } = response.data!.login;
    if (user) {
      dispatch(authAction.setCurrentUser(user));
      dispatch(authAction.setIsLoggedIn(true));
      router.push('/');
    }
    if (errors) {
      const { message } = mapError(errors);
      setError('password', { message });
    }
  };

  const responseFacebook = async (data: ReactFacebookLoginInfo) => {
    const { userID, accessToken } = data;
    const response = await loginFacebook({
      variables: { userId: userID, accessToken }
    });

    const success = response.data?.loginFacebook.success;
    if (success) {
      router.push('/');
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
          <Button disabled={loading} className={cx('button')} primary size='lg' type='submit'>
            {loading ? <Loading size='sm' className='loading' /> : ' Log In'}
          </Button>
          <div className={cx('con')}>
            <hr className={cx('hr')} />
            <span className={cx('or')}>OR</span>
          </div>
          <div className={cx('wrapper-login')}>
            <div className={cx('facebook-login')}>
              <FaFacebookSquare className={cx('icon')} />
              <FacebookLogin
                appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
                autoLoad
                fields='name,email,picture'
                callback={responseFacebook}
                render={(renderProps: any) => (
                  <span onClick={renderProps.onClick} className={cx('login')}>
                    Log in with facebook
                  </span>
                )}
              />
            </div>
            <Link href={'/forgotPassword'} className={cx('forgot-password')}>
              forgot password?
            </Link>
          </div>
        </form>
      </div>
      <div className={cx('wrapper-register')}>
        <span>You don't have an account?</span>
        <Link href={'/register'}>Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
