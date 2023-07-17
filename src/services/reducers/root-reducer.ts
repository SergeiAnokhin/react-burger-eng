import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { itemReducer } from './item-reducer';
import { constructorReducer } from './constructor-reducer';
import { orderReducer } from './order-reducer';
import { userReducer } from './user-reducer';
import { wsReducer } from './ws-reducer';
import { wsUserReducer } from './ws-user-reducer';

export const rootReducer = combineReducers({
  ingredientsReducer,
  itemReducer,
  constructorReducer,
  orderReducer,
  userReducer,
  wsReducer,
  wsUserReducer
});
