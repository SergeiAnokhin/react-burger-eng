import {
  getOrder,
  openOrderModal,
  loadingOrder,
  errorOrder
} from '../actions/order-actions';
import { resetConstructor } from '../actions/constructor-actions';
import { getCookie } from '../../utils/cookie';
import { TOrderUserResponse } from './../../utils/types';
import { AppThunk } from './../index';
import { API_URL } from './api';

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export async function getOrderResponse(data: string[]) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    body: JSON.stringify({
      ingredients: data
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      Authorization: 'Bearer ' + getCookie('token')
    }
  });
  return checkResponse<TOrderUserResponse>(res);
}

export const getOrderThunk = (data: string[]): AppThunk =>
  data.length > 0
    ? (dispatch) => {
        dispatch(loadingOrder(true));
        getOrderResponse(data)
          .then((res) => {
            dispatch(getOrder(res));
            dispatch(openOrderModal(true));
            dispatch(resetConstructor());
          })
          .catch((e) => {
            dispatch(errorOrder(true));
            console.log('Ошибка получения данных с сервера', e.message);
          })
          .finally(() => {
            dispatch(loadingOrder(false));
          });
      }
    : () => {};
