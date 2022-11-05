import FormField from '~/components/FormField';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classnames';
import { useState } from 'react';
import Image from '~/components/Image';
import { logo } from '~/assets/images';
import Button from '~/components/Button';
const cx = bindClass(styles);
const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChange = () => {};
  return (
    <div className={cx('container')}>
      <Image className={cx('img')} src={logo.src} alt='instagram-logo' />
      <form className='wrapper'>
        <div>
          <FormField value='' placeholder='' onChange={(e) => setPassword(e.target.value)} />
          <FormField value='' placeholder='' onChange={(e) => setEmail(e.target.value)} />`{' '}
        </div>
        <Button className={cx('button')} primary size='lg'>
          Log In
        </Button>
        <div className={cx('con')}>
          <hr className={cx('hr')} />
          <span className={cx('or')}>Or</span>
        </div>
        <div>
          <span>Log in with facebook</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
