/* eslint-disable import/named */
import { compose, createStore, applyMiddleware } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook
} from 'react-redux';
import { TUserActions } from './actions/user-actions';
import { TOrderActions } from './actions/order-actions';
import { TItemActions } from './actions/item-actions';
import { TIngredientsActions } from './actions/ingredients-actions';
import { TConstructorActions } from './actions/constructor-actions';
import { rootReducer } from './reducers/root-reducer';
import { wsMiddleware } from './requests/ws-thunk';
import { URL_GET_ORDERS } from './requests/api';
import { wsActions, TWsActions } from './actions/ws-actions';
import { wsUserActions, TWsUserActions } from './actions/ws-user-actions';

export type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TItemActions
  | TOrderActions
  | TUserActions
  | TWsActions
  | TWsUserActions;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers =
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    wsMiddleware(`${URL_GET_ORDERS}/all`, wsActions),
    wsMiddleware(URL_GET_ORDERS, wsUserActions)
  )
);

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch>();
