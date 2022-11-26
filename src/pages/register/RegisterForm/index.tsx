import FormField from '~/components/FormField';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import { useState } from 'react';
import Image from '~/components/Image';
import { logo } from '~/assets/images';
import Button from '~/components/Button';
import { FaFacebookSquare } from 'react-icons/fa';
import Link from 'next/link';
const cx = bindClass(styles);
const RegisterForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const onChange = () => {};
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
        <form className='wrapper'>
          <div className={cx('con')}>
            <hr className={cx('hr')} />
            <span className={cx('or')}>OR</span>
          </div>
          <div className='inputs'>
            <FormField
              value={email}
              placeholder='Phone number, user or email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              value={username}
              placeholder='Username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormField
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className={cx('button')} primary size='lg'>
            Register
          </Button>
        </form>
      </div>
      <div className={cx('wrapper-login')}>
        <span>Do you have an account?</span>
        <Link href={'#'}>Log In</Link>
      </div>
    </div>
  );
};

export default RegisterForm;
