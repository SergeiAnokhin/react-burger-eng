import { TOrderUserResponse } from '../../utils/types';
import {
  GET_ORDER,
  OPEN_ORDER_MODAL,
  LOADING_ORDER,
  ERROR_ORDER
} from './types-actions';

export type TOpenOrderModal = {
  readonly type: typeof OPEN_ORDER_MODAL;
  readonly payload: boolean;
};

export type TGetOrder = {
  readonly type: typeof GET_ORDER;
  readonly payload: TOrderUserResponse;
};

export type TLoadingOrder = {
  readonly type: typeof LOADING_ORDER;
  readonly payload: boolean;
};

export type TErrorOrder = {
  readonly type: typeof ERROR_ORDER;
  readonly payload: boolean;
};

export type TOrderActions =
  | TOpenOrderModal
  | TGetOrder
  | TLoadingOrder
  | TErrorOrder;

export const openOrderModal = (value: boolean): TOpenOrderModal => ({
  type: OPEN_ORDER_MODAL,
  payload: value
});

export const getOrder = (value: TOrderUserResponse): TGetOrder => ({
  type: GET_ORDER,
  payload: value
});

export const loadingOrder = (value: boolean): TLoadingOrder => ({
  type: LOADING_ORDER,
  payload: value
});

export const errorOrder = (value: boolean): TErrorOrder => ({
  type: ERROR_ORDER,
  payload: value
});
