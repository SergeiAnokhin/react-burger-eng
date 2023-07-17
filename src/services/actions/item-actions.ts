import { OPEN_INGREDIENT_MODAL, INGREDIENT_ID } from './types-actions';

export type TOpenIngredientModal = {
  readonly type: typeof OPEN_INGREDIENT_MODAL;
  readonly payload: boolean;
};

export type TIngredientId = {
  readonly type: typeof INGREDIENT_ID;
  readonly payload: string;
};

export type TItemActions = TOpenIngredientModal | TIngredientId;

export const openIngredientModal = (value: boolean): TOpenIngredientModal => ({
  type: OPEN_INGREDIENT_MODAL,
  payload: value
});

export const ingredientId = (id: string): TIngredientId => ({
  type: INGREDIENT_ID,
  payload: id
});
