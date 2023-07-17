import { TIngredient } from './../../utils/types';
/* eslint-disable */
import {
  setIngredients,
  loadingIngredients,
  errorIngredients
} from '../actions/ingredients-actions';
import { AppThunk } from './../index';
import { API_URL } from './api';

const checkResponse = <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export async function getIngredients() {
  const res = await fetch(`${API_URL}/ingredients`);
  return checkResponse<{ data: TIngredient[]; success: boolean }>(res);
}

export const setIngredientsThunk = (): AppThunk => (dispatch) => {
  dispatch(loadingIngredients(true));
  getIngredients()
    .then((res) => {
      dispatch(setIngredients(res.data));
    })
    .catch((e) => {
      dispatch(errorIngredients(true));
      console.log('Ошибка получения данных с сервера', e.message);
    })
    .finally(() => {
      dispatch(loadingIngredients(false));
    });
};
