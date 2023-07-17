import { useRef, useState, SyntheticEvent } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../../utils/types';
import { useSelector, useDispatch } from '../../services';
import { forgotUserPasswordThunk } from '../../services/requests/user-thunk';
import styles from './forgot-password-page.module.css';

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);

  const [email, setEmail] = useState<string>('');
  const inputEmailRef = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotUserPasswordThunk(email));
  };

  return user.auth ? (
    <Redirect to="/profile" />
  ) : user.forgotPass ? (
    <Redirect to="/reset-password" />
  ) : (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Reset password</h1>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={(e) => setEmail(e.target.value)}
          icon={undefined}
          value={email}
          name={'email'}
          error={false}
          ref={inputEmailRef}
          onIconClick={undefined}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium" htmlType="reset">
          Reset
        </Button>
        <p className={`${styles.text} mt-20`}>
          <span>Remembered your password?</span>
          <span>
            <Link className={styles.link} to="/login">
              Sign in
            </Link>
          </span>
        </p>
      </form>
    </main>
  );
};
