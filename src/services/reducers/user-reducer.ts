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
} from '../actions/types-actions';
import { TUserActions } from './../actions/user-actions';

type TInitialState = {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  auth: boolean;
  error: boolean;
  forgotPass: boolean;
  resetPass: boolean;
};

const initialState: TInitialState = {
  name: '',
  email: '',
  password: '',
  loading: false,
  auth: false,
  error: false,
  forgotPass: false,
  resetPass: false
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TInitialState => {
  switch (action.type) {
    case REGISTRATION_USER:
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        auth: action.payload.success
      };
    case LOGIN_USER:
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        auth: action.payload.success,
        forgotPass: false,
        resetPass: false
      };
    case FORGOT_USER_PASSWORD:
      return { ...state, forgotPass: action.payload.success };
    case RESET_USER_PASSWORD:
      return { ...state, resetPass: action.payload.success };
    case GET_USER_INFO:
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        auth: action.payload.success
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        name: action.payload.user.name,
        email: action.payload.user.email,
        auth: action.payload.success
      };
    case LOGOUT_USER:
      return { ...state, name: '', email: '', auth: false };
    case LOADING_USER:
      return { ...state, loading: action.payload };
    case ERROR_USER:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
