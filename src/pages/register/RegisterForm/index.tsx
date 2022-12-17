import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import FormField from '~/components/FormField';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import Image from '~/components/Image';
import { logo } from '~/assets/images';
import Button from '~/components/Button';
import { FaFacebookSquare } from 'react-icons/fa';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema, ValidationSchema } from './formValidation';
import { useLoginFacebookMutation, useVerifiedUserMutation } from '~/types/generated';
import { useStoreDispatch } from '~/redux/store';
import { authAction } from '~/redux/slices/authSlice';
import { useRouter } from 'next/router';
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import { useEffect } from 'react';
import Loading from '~/components/Loading';
const cx = bindClass(styles);

const RegisterForm = () => {
  const router = useRouter();
  const [verifiedUser, { data, loading }] = useVerifiedUserMutation();
  const [loginFacebook] = useLoginFacebookMutation();
  const dispatch = useStoreDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: ValidationSchema) => {
    const { email } = data;
    dispatch(authAction.setToVerifyUser(data));
    await verifiedUser({
      variables: { verifyUser: email }
    });
  };

  useEffect(() => {
    if (data?.verifiedUser.success) {
      router.push('/verifyAccount');
    }
  }, [data?.verifiedUser.success]);

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
        <div className={cx('header')}>
          <Image className={cx('img')} src={logo.src} alt='instagram-logo' />
          <span>Register to view videos and photos from your friends.</span>

          <FacebookLogin
            appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID}
            autoLoad
            fields='name,email,picture'
            callback={responseFacebook}
            render={(renderProps: any) => (
              <Button
                onClick={renderProps.onClick}
                className={cx('button-facebook')}
                primary
                size='lg'
              >
                <FaFacebookSquare className={cx('icon')} />
                <span>Log in with facebook</span>
              </Button>
            )}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='wrapper'>
          <div className={cx('con')}>
            <hr className={cx('hr')} />
            <span className={cx('or')}>OR</span>
          </div>
          <div className='inputs'>
            <FormField placeholder='Email' register={register('email')} errors={errors} />
            <FormField placeholder='Username' register={register('username')} errors={errors} />
            <FormField
              type='password'
              placeholder='Password'
              register={register('password')}
              errors={errors}
            />
          </div>
          <Button className={cx('button')} primary size='lg'>
            {loading ? <Loading size='sm' className='loading' /> : 'Register'}
          </Button>
        </form>
      </div>
      <div className={cx('wrapper-login')}>
        <span>Do you have an account?</span>
        <Link href={'/login'}>Log In</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
