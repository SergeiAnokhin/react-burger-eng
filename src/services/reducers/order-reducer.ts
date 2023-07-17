import { TOrderUser } from '../../utils/types';
import {
  GET_ORDER,
  OPEN_ORDER_MODAL,
  LOADING_ORDER,
  ERROR_ORDER
} from '../actions/types-actions';
import { TOrderActions } from './../actions/order-actions';

type TInitialState = {
  name: string;
  order: TOrderUser | null;
  success: boolean;
  open: boolean;
  loading: boolean;
  error: boolean;
};

const initialState: TInitialState = {
  name: '',
  order: null,
  success: false,
  open: false,
  loading: false,
  error: false
};

export const orderReducer = (
  state = initialState,
  action: TOrderActions
): TInitialState => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        name: action.payload.name,
        order: action.payload.order,
        success: action.payload.success
      };
    case OPEN_ORDER_MODAL:
      return { ...state, open: action.payload };
    case LOADING_ORDER:
      return { ...state, loading: action.payload };
    case ERROR_ORDER:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
