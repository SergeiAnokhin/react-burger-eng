import { SyntheticEvent, useRef, useState } from 'react';
import {
  Input,
  PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { Button } from '../../utils/types';
import { useSelector, useDispatch } from '../../services';
import { registrationUserThunk } from '../../services/requests/user-thunk';
import styles from './register-page.module.css';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);

  const onSubmitForm = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      registrationUserThunk({
        email: email,
        password: password,
        name: name
      })
    );
  };

  return user.auth ? (
    <Redirect to="/login" />
  ) : (
    <main className={styles.wrapper}>
      <h1 className={styles.title}>Sign up</h1>
      <form className={styles.form} onSubmit={onSubmitForm}>
        <Input
          type={'text'}
          placeholder={'Name'}
          onChange={(e) => setName(e.target.value)}
          icon={undefined}
          value={name}
          name={'name'}
          error={false}
          ref={inputNameRef}
          onIconClick={undefined}
          errorText={'Ошибка'}
          size={'default'}
        />
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
          Sign up
        </Button>
        <p className={`${styles.text} mt-20`}>
          <span>Already registered?</span>
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
