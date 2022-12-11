import { useState } from 'react';
import Button from '~/components/Button';
import { SubLayout } from '~/layouts/SubLayout';
import { bindClass } from '~/lib/classNames';
import { useAuthSelector } from '~/redux/selector';
import { useRegisterMutation } from '~/types/generated';
import styles from './styles.module.scss';
const cx = bindClass(styles);
const verifyAcount = () => {
  const [verifyCode, setVerifyCode] = useState<string>();
  const { toVerifyUser } = useAuthSelector();

  const [registerUser, { data, loading }] = useRegisterMutation();
  console.log(data);

  const handleSubmit = () => {
    const code = +verifyCode!;
    console.log(code);
    const data = { ...toVerifyUser, code };

    registerUser({
      variables: { registerInput: data }
    });
  };
  return (
    <SubLayout title='verifyAccount'>
      <div className={cx('container')}>
        <input
          className={cx('input')}
          type='text'
          onChange={(e) => setVerifyCode(e.target.value)}
        />
        <Button onClick={handleSubmit} primary size='md'>
          Verify
        </Button>
      </div>
    </SubLayout>
  );
};

export default verifyAcount;
