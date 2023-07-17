import { useState, useRef, SyntheticEvent } from 'react';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../../utils/types';
import { useSelector, useDispatch } from '../../services';
import { resetUserPasswordThunk } from '../../services/requests/user-thunk';
import styles from './reset-password-page.module.css';

export const ResetPasswordPage = () => {
  const [password, setPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const inputTokenRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);

  const onSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      resetUserPasswordThunk({
        password: password,
        token: token
      })
    );
  };

  return !user.forgotPass && !user.auth ? (
    <Redirect to="/forgot-password" />
  ) : user.resetPass ? (
    <Redirect to="/login" />
  ) : user.auth ? (
    <Redirect to="/profile" />
  ) : (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Reset password</h1>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'password'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setToken(e.target.value)}
          icon={undefined}
          value={token}
          name={'token'}
          error={false}
          ref={inputTokenRef}
          onIconClick={undefined}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type="primary" size="medium" htmlType="button">
          Сохранить
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
