import { nanoid } from 'nanoid';
import { TIngredient } from '../../utils/types';
import {
  ADD_BUN,
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_CONSTRUCTOR,
  RESET_CONSTRUCTOR
} from './types-actions';

export type TAddBun = {
  readonly type: typeof ADD_BUN;
  readonly payload: TIngredient;
};

export type TAddIngredient = {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: TIngredient & { nanoid: string };
};

export type TDeleteIngredient = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: string;
};

export type TSortConstructor = {
  readonly type: typeof SORT_CONSTRUCTOR;
  readonly payload: Array<TIngredient>;
};

export type TResetConstructor = {
  readonly type: typeof RESET_CONSTRUCTOR;
};

export type TConstructorActions =
  | TAddBun
  | TAddIngredient
  | TDeleteIngredient
  | TSortConstructor
  | TResetConstructor;

export const addBun = (res: TIngredient): TAddBun => ({
  type: ADD_BUN,
  payload: res
});

export const addIngredient = (res: TIngredient): TAddIngredient => ({
  type: ADD_INGREDIENT,
  payload: { ...res, nanoid: nanoid() }
});

export const deleteIngredient = (id: string): TDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  payload: id
});

export const sortConstructor = (res: Array<TIngredient>): TSortConstructor => ({
  type: SORT_CONSTRUCTOR,
  payload: res
});

export const resetConstructor = (): TResetConstructor => ({
  type: RESET_CONSTRUCTOR
});
