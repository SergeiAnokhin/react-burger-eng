import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import { Button } from '../../utils/types';
import { useSelector, useDispatch } from '../../services';
import { updateUserInfoThunk } from '../../services/requests/user-thunk';
import styles from './profile-info.module.css';

export const ProfileInfo = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);

  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>('');

  const [editName, setEditName] = useState<boolean>(true);
  const [editEmail, setEditEmail] = useState<boolean>(true);
  const [editPassword, setEditPassword] = useState<boolean>(true);

  const [inputNameIcon, setInputNameIcon] = useState<keyof TICons>('EditIcon');
  const [inputEmailIcon, setInputEmailIcon] =
    useState<keyof TICons>('EditIcon');
  const [inputPasswordIcon, setInputPasswordIcon] =
    useState<keyof TICons>('EditIcon');

  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputEmailRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const onNameEditClick = () => {
    if (inputNameIcon === 'EditIcon') {
      setInputNameIcon('CheckMarkIcon');
      setEditName(false);
      setTimeout(() => inputNameRef.current?.focus(), 0);
    }
    if (inputNameIcon === 'CheckMarkIcon') {
      setInputNameIcon('EditIcon');
    }
  };

  const onEmailEditClick = () => {
    if (inputEmailIcon === 'EditIcon') {
      setInputEmailIcon('CheckMarkIcon');
      setEditEmail(false);
      setTimeout(() => inputEmailRef.current?.focus(), 0);
    }
    if (inputEmailIcon === 'CheckMarkIcon') {
      setInputEmailIcon('EditIcon');
    }
  };

  const onPasswordEditClick = () => {
    if (inputPasswordIcon === 'EditIcon') {
      setInputPasswordIcon('CheckMarkIcon');
      setEditPassword(false);
      setTimeout(() => inputPasswordRef.current?.focus(), 0);
    }
    if (inputPasswordIcon === 'CheckMarkIcon') {
      setInputPasswordIcon('EditIcon');
    }
  };

  useEffect(() => {
    inputNameRef.current?.addEventListener('blur', () => {
      setInputNameIcon('EditIcon');
      setEditName(true);
    });
  }, [editName]);

  useEffect(() => {
    inputEmailRef.current?.addEventListener('blur', () => {
      setInputEmailIcon('EditIcon');
      setEditEmail(true);
    });
  }, [editEmail]);

  useEffect(() => {
    inputPasswordRef.current?.addEventListener('blur', () => {
      setInputPasswordIcon('EditIcon');
      setEditPassword(true);
    });
  }, [editPassword]);

  const handlerReset = (e: SyntheticEvent) => {
    e.preventDefault();
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  };

  const handlerSave = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUserInfoThunk({
        email: email,
        password: password,
        name: name
      })
    );
  };

  return (
    <form className={styles.form}>
      <Input
        type={'text'}
        placeholder={'Name'}
        onChange={(e) => setName(e.target.value)}
        icon={inputNameIcon}
        value={name}
        name={'name'}
        error={false}
        ref={inputNameRef}
        onIconClick={onNameEditClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled={editName}
      />
      <Input
        type={'email'}
        placeholder={'Login'}
        onChange={(e) => setEmail(e.target.value)}
        icon={inputEmailIcon}
        value={email}
        name={'email'}
        error={false}
        ref={inputEmailRef}
        onIconClick={onEmailEditClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled={editEmail}
      />
      <Input
        type={'password'}
        placeholder={'Password'}
        onChange={(e) => setPassword(e.target.value)}
        icon={inputPasswordIcon}
        value={password}
        name={'password'}
        error={false}
        ref={inputPasswordRef}
        onIconClick={onPasswordEditClick}
        errorText={'Ошибка'}
        size={'default'}
        disabled={editPassword}
      />
      {name !== user.name ||
      email !== user.email ||
      password !== user.password ? (
        <div className={styles.btns}>
          <Button
            type="secondary"
            size="medium"
            htmlType="button"
            onClick={handlerReset}
          >
            Отмена
          </Button>
          <Button
            type="primary"
            size="medium"
            htmlType="button"
            onClick={handlerSave}
          >
            Сохранить
          </Button>
        </div>
      ) : (
        ''
      )}
    </form>
  );
};
