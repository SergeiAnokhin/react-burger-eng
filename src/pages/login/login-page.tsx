import { useEffect, useRef, useState, SyntheticEvent } from 'react';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Button } from '../../utils/types';
import { useSelector, useDispatch } from '../../services';
import { loginUserThunk } from '../../services/requests/user-thunk';
import { Preloader } from '../../components/preloader/preloader';
import { getCookie } from '../../utils/cookie';
import styles from './login-page.module.css';

export const LoginPage = () => {
  type TLocation = {
    from: Location;
    background?: Location;
    pathname: string;
  };
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);
  const location = useLocation<TLocation>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [title, setTitle] = useState<string>('Sign in');
  const inputEmailRef = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginUserThunk({
        email: email,
        password: password
      })
    );
  };

  useEffect(() => {
    if (user.error) {
      setTitle('Неверный Login или пароль');
    }
  }, [user.error]);

  return getCookie('token') &&
    localStorage.getItem('token') &&
    !user.loading &&
    user.auth ? (
    <Redirect to={location.state ? location.state.from.pathname : '/'} />
  ) : getCookie('token') && localStorage.getItem('token') && user.loading ? (
    <Preloader />
  ) : (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>{title}</h1>
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
        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name={'password'}
          placeholder='Password'
        />
        <Button type="primary" size="medium" htmlType="submit">
          Sign in
        </Button>
        <p className={`${styles.text} mt-20`}>
          <span>Are you a new user?</span>
          <span>
            <Link className={styles.link} to="/register">
              Sign up
            </Link>
          </span>
        </p>
        <p className={styles.text}>
          <span>Forgot your password?</span>
          <span>
            <Link className={styles.link} to="/forgot-password">
              Reset password
            </Link>
          </span>
        </p>
      </form>
    </main>
  );
};
