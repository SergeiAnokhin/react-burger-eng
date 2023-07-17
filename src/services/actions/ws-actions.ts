import { TOrdersResponse } from '../../utils/types';
import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from './types-actions';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export type TWsConnectionStart = {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
};

export type TWsConnectionSuccess = {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export type TWsConnectionClosed = {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export type TWsConnectionError = {
  readonly type: typeof WS_CONNECTION_ERROR;
};

export type TWsGetMessage = {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TOrdersResponse;
};

export type TWsActions =
  | TWsConnectionStart
  | TWsConnectionSuccess
  | TWsConnectionClosed
  | TWsConnectionError
  | TWsGetMessage;

export const wsConnectionStart = (value: string): TWsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload: value
});

export const wsConnectionSuccess = (): TWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS
});

export const wsConnectionClosed = (): TWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED
});

export const wsConnectionError = (): TWsConnectionError => ({
  type: WS_CONNECTION_ERROR
});

export const wsGetMessage = (value: TOrdersResponse): TWsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload: value
});
