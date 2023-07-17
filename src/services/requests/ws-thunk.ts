/* eslint-disable import/named */
import { Middleware, MiddlewareAPI, Dispatch } from 'redux';
import { TWsActions } from '../../utils/types';
import { RootState } from '..';

export const wsMiddleware =
  (wsUrl: string, wsActions: TWsActions): Middleware =>
  (store: MiddlewareAPI<Dispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
      }

      if (socket) {
        socket.onopen = () => {
          dispatch({ type: onOpen });
        };

        socket.onerror = () => {
          dispatch({ type: onError });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const dataObj = JSON.parse(data);
          dispatch({ type: onMessage, payload: dataObj });
        };
      }

      if (type === onClose && socket) {
        socket.close();
      }

      next(action);
    };
  };
