import { combineReducers } from 'redux'
import productReducer from './productReducer';
import categoryReducer from './categoryReducer';
import otherReducer from './otherReducer';

const rootReducer = combineReducers({
  product: productReducer,
  category: categoryReducer,
  other: otherReducer
})

export default rootReducer