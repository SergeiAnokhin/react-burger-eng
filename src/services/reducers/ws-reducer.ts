import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from '../actions/types-actions';
import { TOrder } from './../../utils/types';
import { TWsActions } from './../actions/ws-actions';

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

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TInitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: false,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: true,
        wsConnected: false
      };
    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: false,
        wsConnected: false
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        error: false,
        orders: [...action.payload.orders],
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
};
