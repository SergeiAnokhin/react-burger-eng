import { TUserAction, TUserPassword, TUserInfo } from '../../utils/types';
import {
  REGISTRATION_USER,
  LOGIN_USER,
  LOGOUT_USER,
  LOADING_USER,
  ERROR_USER,
  GET_USER_INFO,
  UPDATE_USER_INFO,
  FORGOT_USER_PASSWORD,
  RESET_USER_PASSWORD
} from './types-actions';

export type TRegistrationUser = {
  readonly type: typeof REGISTRATION_USER;
  readonly payload: TUserAction;
};

export type TLoginUser = {
  readonly type: typeof LOGIN_USER;
  readonly payload: TUserAction;
};

export type TForgotUserPassword = {
  readonly type: typeof FORGOT_USER_PASSWORD;
  readonly payload: TUserPassword;
};

export type TResetUserPassword = {
  readonly type: typeof RESET_USER_PASSWORD;
  readonly payload: TUserPassword;
};

export type TGetUserInfo = {
  readonly type: typeof GET_USER_INFO;
  readonly payload: TUserInfo;
};

export type TUpdateUserInfo = {
  readonly type: typeof UPDATE_USER_INFO;
  readonly payload: TUserInfo;
};

export type TLogoutUser = {
  readonly type: typeof LOGOUT_USER;
};

export type TLoadingUser = {
  readonly type: typeof LOADING_USER;
  readonly payload: boolean;
};

export type TErrorUser = {
  readonly type: typeof ERROR_USER;
  readonly payload: boolean;
};

export type TUserActions =
  | TRegistrationUser
  | TLoginUser
  | TForgotUserPassword
  | TResetUserPassword
  | TGetUserInfo
  | TUpdateUserInfo
  | TLogoutUser
  | TLoadingUser
  | TErrorUser;

export const registrationUser = (value: TUserAction): TRegistrationUser => ({
  type: REGISTRATION_USER,
  payload: value
});

export const loginUser = (value: TUserAction): TLoginUser => ({
  type: LOGIN_USER,
  payload: value
});

export const forgotUserPassword = (
  value: TUserPassword
): TForgotUserPassword => ({
  type: FORGOT_USER_PASSWORD,
  payload: value
});

export const resetUserPassword = (
  value: TUserPassword
): TResetUserPassword => ({
  type: RESET_USER_PASSWORD,
  payload: value
});

export const getUserInfo = (value: TUserInfo): TGetUserInfo => ({
  type: GET_USER_INFO,
  payload: value
});

export const updateUserInfo = (value: TUserInfo): TUpdateUserInfo => ({
  type: UPDATE_USER_INFO,
  payload: value
});

export const logoutUser = (): TLogoutUser => ({
  type: LOGOUT_USER
});

export const loadingUser = (value: boolean): TLoadingUser => ({
  type: LOADING_USER,
  payload: value
});

export const errorUser = (value: boolean): TErrorUser => ({
  type: ERROR_USER,
  payload: value
});
