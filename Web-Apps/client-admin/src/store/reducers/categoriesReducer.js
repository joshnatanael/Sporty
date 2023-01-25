import { FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_DETAIL } from '../actions/actionTypes';

const initialState = {
  categories: [],
  category: {}
}

function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload
      }
    case FETCH_CATEGORY_DETAIL:
      return {
        ...state,
        category: action.payload
      }
    default:
      return state
  }
}

export default categoriesReducer;