import {
  registrationUser,
  loginUser,
  loadingUser,
  errorUser,
  logoutUser,
  getUserInfo,
  updateUserInfo,
  forgotUserPassword,
  resetUserPassword
} from '../actions/user-actions';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookie';
import { TUserAction, TUserPassword, TUserInfo } from './../../utils/types';
import { AppThunk } from './../index';
import { API_URL } from './api';

const headers = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:3000',
  'Access-Control-Allow-Methods': 'POST',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-type': 'application/json; charset=UTF-8'
};

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Registration User =======================

export async function registrationUserResponse(
  email: string,
  password: string,
  name: string
) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
    headers: headers
  });
  return checkResponse<TUserAction>(res);
}

type TRegistrationUserInfo = {
  email: string;
  password: string;
  name: string;
};

export const registrationUserThunk =
  ({ email, password, name }: TRegistrationUserInfo): AppThunk =>
  (dispatch) => {
    dispatch(loadingUser(true));
    registrationUserResponse(email, password, name)
      .then((res) => {
        localStorage.setItem('token', res.refreshToken);
        sessionStorage.setItem('token', res.accessToken);
        setCookie('token', res.accessToken.split('Bearer ')[1]);
        dispatch(registrationUser(res));
      })
      .catch((e) => {
        dispatch(errorUser(true));
        console.log('Ошибка получения данных с сервера', e.message);
      })
      .finally(() => {
        dispatch(loadingUser(false));
      });
  };

// Update User Info =======================

export async function updateUserInfoResponse(
  email: string,
  password: string,
  name: string
) {
  const res = await fetch(`${API_URL}/auth/user`, {
    method: 'PATCH',
    body: JSON.stringify({
      email: email,
      password: password,
      name: name
    }),
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getCookie('token')
    }
  });
  return checkResponse<TUserAction>(res);
}

type TUpdateUserInfo = {
  email: string;
  password: string;
  name: string;
};

export const updateUserInfoThunk =
  ({ email, password, name }: TUpdateUserInfo): AppThunk =>
  (dispatch) => {
    dispatch(loadingUser(true));
    updateUserInfoResponse(email, password, name)
      .then((res) => {
        dispatch(updateUserInfo(res));
      })
      .catch((e) => {
        dispatch(errorUser(true));
        console.log('Ошибка получения данных с сервера', e.message);
      })
      .finally(() => {
        dispatch(loadingUser(false));
      });
  };

// Login User =======================

export async function loginUserResponse(email: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: headers
  });
  return checkResponse<TUserAction>(res);
}

type TLoginUser = {
  email: string;
  password: string;
};

export const loginUserThunk =
  ({ email, password }: TLoginUser): AppThunk =>
  (dispatch) => {
    dispatch(loadingUser(true));
    loginUserResponse(email, password)
      .then((res) => {
        localStorage.setItem('token', res.refreshToken);
        sessionStorage.setItem('token', res.accessToken);
        setCookie('token', res.accessToken.split('Bearer ')[1]);
        dispatch(errorUser(false));
        dispatch(loginUser(res));
      })
      .catch((e) => {
        dispatch(errorUser(true));
        console.log('Ошибка получения данных с сервера', e.message);
      })
      .finally(() => {
        dispatch(loadingUser(false));
      });
  };

// Forgot User Password =======================

export async function forgotUserPasswordResponse(email: string) {
  const res = await fetch(`${API_URL}/password-reset`, {
    method: 'POST',
    body: JSON.stringify({
      email: email
    }),
    headers: headers
  });
  return checkResponse<TUserPassword>(res);
}

export const forgotUserPasswordThunk =
  (email: string): AppThunk =>
  (dispatch) => {
    dispatch(loadingUser(true));
    forgotUserPasswordResponse(email)
      .then((res) => {
        dispatch(forgotUserPassword(res));
      })
      .catch((e) => {
        dispatch(errorUser(true));
        console.log('Ошибка получения данных с сервера', e.message);
      })
      .finally(() => {
        dispatch(loadingUser(false));
      });
  };

// Reset User Password =======================

export async function resetUserPasswordResponse(
  password: string,
  token: string
) {
  const res = await fetch(`${API_URL}/password-reset/reset`, {
    method: 'POST',
    body: JSON.stringify({
      password: password,
      token: token
    }),
    headers: headers
  });
  return checkResponse<TUserPassword>(res);
}

type TResetUserPassword = {
  password: string;
  token: string;
};

export const resetUserPasswordThunk =
  ({ password, token }: TResetUserPassword): AppThunk =>
  (dispatch) => {
    dispatch(loadingUser(true));
    resetUserPasswordResponse(password, token)
      .then((res) => {
        dispatch(resetUserPassword(res));
      })
      .catch((e) => {
        dispatch(errorUser(true));
        console.log('Ошибка получения данных с сервера', e.message);
      })
      .finally(() => {
        dispatch(loadingUser(false));
      });
  };

// Get User Info =======================

export async function getUserInfoResponse() {
  const res = await fetch(`${API_URL}/auth/user`, {
    method: 'GET',
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getCookie('token')
    }
  });
  return checkResponse<TUserInfo>(res);
}

export const getUserInfoThunk = (): AppThunk => (dispatch) => {
  dispatch(loadingUser(true));
  getUserInfoResponse()
    .then((res) => {
      dispatch(getUserInfo(res));
    })
    .catch((e) => {
      dispatch(errorUser(true));
      console.log('ошибка полчения данных пользователя');
      console.log('Ошибка получения данных с сервера', e.message);
    })
    .finally(() => {
      dispatch(loadingUser(false));
    });
};

// Logout User =======================

export async function logoutUserResponse() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('token')
    }),
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getCookie('token')
    }
  });
  return checkResponse(res);
}

export const logoutUserThunk = (): AppThunk => (dispatch) => {
  dispatch(loadingUser(true));
  logoutUserResponse()
    .then(() => {
      deleteCookie('token');
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      dispatch(logoutUser());
    })
    .catch((e) => {
      dispatch(errorUser(true));
      console.log('Ошибка получения данных с сервера', e.message);
    })
    .finally(() => {
      dispatch(loadingUser(false));
    });
};

// Refresh User Token =======================

export async function refreshTokenResponse() {
  const res = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    body: JSON.stringify({
      token: localStorage.getItem('token')
    }),
    headers: {
      ...headers,
      Authorization: 'Bearer ' + getCookie('token')
    }
  });
  return checkResponse<TUserAction>(res);
}

export const refreshTokenThunk = (): AppThunk => (dispatch) =>
  refreshTokenResponse()
    .then((res) => {
      localStorage.setItem('token', res.refreshToken);
      sessionStorage.setItem('token', res.accessToken);
      setCookie('token', res.accessToken.split('Bearer ')[1]);
      console.log(getCookie('token'));
    })
    .catch((e) => {
      console.log('Ошибка получения данных с сервера', e.message);
    });
