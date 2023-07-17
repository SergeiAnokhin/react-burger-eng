import { TIngredient } from '../../utils/types';
import {
  SET_INGREDIENTS,
  LOADING_INGREDIENTS,
  ERROR_INGREDIENTS
} from './types-actions';

export type TSetIngredients = {
  readonly type: typeof SET_INGREDIENTS;
  readonly payload: Array<TIngredient>;
};

export type TLoadingIngredients = {
  readonly type: typeof LOADING_INGREDIENTS;
  readonly payload: boolean;
};

export type TErrorIngredients = {
  readonly type: typeof ERROR_INGREDIENTS;
  readonly payload: boolean;
};

export type TIngredientsActions =
  | TSetIngredients
  | TLoadingIngredients
  | TErrorIngredients;

export const setIngredients = (res: Array<TIngredient>): TSetIngredients => ({
  type: SET_INGREDIENTS,
  payload: res
});

export const loadingIngredients = (value: boolean): TLoadingIngredients => ({
  type: LOADING_INGREDIENTS,
  payload: value
});

export const errorIngredients = (value: boolean): TErrorIngredients => ({
  type: ERROR_INGREDIENTS,
  payload: value
});
