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
import { RegisterInput, useRegisterMutation } from '~/types/generated';

const cx = bindClass(styles);

const RegisterForm = () => {
  const [registerUser, { data, loading, error }] = useRegisterMutation();
  console.log(data);
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (data: RegisterInput) => {
    const response = await registerUser({
      variables: { registerInput: data }
    });

    console.log(response);
  };
  return (
    <div className={cx('main')}>
      <div className={cx('container')}>
        <div className={cx('header')}>
          <Image className={cx('img')} src={logo.src} alt='instagram-logo' />
          <span>Register to view videos and photos from your friends.</span>
          <Button className={cx('button-facebook')} primary size='lg'>
            <FaFacebookSquare className={cx('icon')} />
            <span>Log in with facebook</span>
          </Button>
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
            Register
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
