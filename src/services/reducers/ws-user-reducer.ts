import {
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE
} from '../actions/types-actions';
import { TWsUserActions } from '../actions/ws-user-actions';
import { TOrder } from './../../utils/types';

type TInitialState = {
  wsConnected: boolean;
  orders: Array<TOrder>;
  total: string | number;
  totalToday: string | number;
  error: boolean;
};

const initialState: TInitialState = {
  wsConnected: false,
  orders: [],
  total: '',
  totalToday: '',
  error: false
};

export const wsUserReducer = (
  state = initialState,
  action: TWsUserActions
): TInitialState => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS:
      return {
        ...state,
        error: false,
        wsConnected: true
      };
    case WS_USER_CONNECTION_ERROR:
      return {
        ...state,
        error: true,
        wsConnected: false
      };
    case WS_USER_CONNECTION_CLOSED:
      return {
        ...state,
        error: false,
        wsConnected: false
      };
    case WS_USER_GET_MESSAGE:
      return {
        ...state,
        error: false,
        orders: [...action.payload.orders].reverse(),
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
};
