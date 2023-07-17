import { TOrdersResponse } from '../../utils/types';
import {
  WS_USER_CONNECTION_START,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_MESSAGE
} from './types-actions';

export const wsUserActions = {
  wsInit: WS_USER_CONNECTION_START,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onError: WS_USER_CONNECTION_ERROR,
  onMessage: WS_USER_GET_MESSAGE
};

export type TWsUserConnectionStart = {
  readonly type: typeof WS_USER_CONNECTION_START;
  readonly payload: string;
};

export type TWsUserConnectionSuccess = {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
};

export type TWsUserConnectionClosed = {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
};

export type TWsUserConnectionError = {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
};

export type TWsUserGetMessage = {
  readonly type: typeof WS_USER_GET_MESSAGE;
  readonly payload: TOrdersResponse;
};

export type TWsUserActions =
  | TWsUserConnectionStart
  | TWsUserConnectionSuccess
  | TWsUserConnectionClosed
  | TWsUserConnectionError
  | TWsUserGetMessage;

export const wsUserConnectionStart = (
  value: string
): TWsUserConnectionStart => ({
  type: WS_USER_CONNECTION_START,
  payload: value
});
export const wsUserConnectionSuccess = (): TWsUserConnectionSuccess => ({
  type: WS_USER_CONNECTION_SUCCESS
});

export const wsUserConnectionClosed = (): TWsUserConnectionClosed => ({
  type: WS_USER_CONNECTION_CLOSED
});

export const wsUserConnectionError = (): TWsUserConnectionError => ({
  type: WS_USER_CONNECTION_ERROR
});

export const wsUserGetMessage = (
  value: TOrdersResponse
): TWsUserGetMessage => ({
  type: WS_USER_GET_MESSAGE,
  payload: value
});
