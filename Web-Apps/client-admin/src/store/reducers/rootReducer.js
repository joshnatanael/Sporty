import { combineReducers } from 'redux'
import productReducer from "./productsReducer";
import categoriesReducer from './categoriesReducer';
import otherReducer from './otherReducer';

const rootReducer = combineReducers({
  product: productReducer,
  category: categoriesReducer,
  other: otherReducer
})

export default rootReducer;