import { OPEN_INGREDIENT_MODAL, INGREDIENT_ID } from '../actions/types-actions';
import { TItemActions } from './../actions/item-actions';

type TInitialstate = {
  open: boolean;
  itemId: string;
};

const initialState: TInitialstate = {
  open: false,
  itemId: ''
};

export const itemReducer = (
  state = initialState,
  action: TItemActions
): TInitialstate => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL:
      return { ...state, open: action.payload };
    case INGREDIENT_ID:
      return { ...state, itemId: action.payload };
    default:
      return state;
  }
};
