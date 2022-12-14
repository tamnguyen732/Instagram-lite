import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { withAuth } from '~/auth';
import Button from '~/components/Button';
import mapError from '~/helpers/mapErrors';
import { SubLayout } from '~/layouts/SubLayout';
import { bindClass } from '~/lib/classNames';
import { useAuthSelector } from '~/redux/selector';
import { authAction } from '~/redux/slices/authSlice';
import { useStoreDispatch } from '~/redux/store';
import { useRegisterMutation } from '~/types/generated';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const verifyAcount = () => {
  const [code, setCode] = useState<string>();
  const { toVerifyUser, currentUser } = useAuthSelector();
  const [newError, setNewError] = useState<string>('');
  const dispatch = useStoreDispatch();
  const router = useRouter();
  const [registerUser, { data, loading, error }] = useRegisterMutation();
  console.log(data);

  const handleSubmit = async () => {
    if (containsAnyLetters(code!)) return;
    if (!code) return;
    const data = { ...toVerifyUser, verifyCode: +code! };
    const response = await registerUser({
      variables: { registerInput: data }
    });

    const errors = response.data?.register.errors;
    const message = response.data?.register.message;
    const user = response.data?.register.user;

    if (message) {
      setNewError(message);
    }
    if (errors?.length) {
      const { message } = mapError(errors);
      if (message) {
        setNewError(message);
      }
    }
    if (user) {
      dispatch(authAction.setCurrentUser(user));
      dispatch(authAction.setIsLoggedIn(true));
      router.push('/');
    }
  };
  function containsAnyLetters(str: string) {
    return /[a-zA-Z]/.test(str);
  }

  useEffect(() => {
    if (containsAnyLetters(code!)) {
      setNewError('Wrong code, please enter again!');
    }
    if (!code) {
      setNewError('');
    }
  }, [newError, code]);
  return (
    <SubLayout title='verifyAccount'>
      <div className={cx('container')}>
        <input className={cx('input')} type='text' onChange={(e) => setCode(e.target.value)} />
        <p className={cx('error')}>{newError}</p>
        <Button onClick={handleSubmit} primary size='md'>
          Verify
        </Button>
      </div>
    </SubLayout>
  );
};

export default verifyAcount;

export const getServerSideProps = withAuth({ isProtected: false });
