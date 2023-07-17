import { TIngredient } from '../../utils/types';
import {
  SET_INGREDIENTS,
  LOADING_INGREDIENTS,
  ERROR_INGREDIENTS
} from '../actions/types-actions';
import { TIngredientsActions } from './../actions/ingredients-actions';

type TInitialstate = {
  loading: boolean;
  error: boolean;
  ingredients: Array<TIngredient>;
};

const initialState: TInitialstate = {
  loading: false,
  error: false,
  ingredients: []
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): TInitialstate => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.payload };
    case LOADING_INGREDIENTS:
      return { ...state, loading: action.payload };
    case ERROR_INGREDIENTS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
