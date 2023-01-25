import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_DETAIL } from "../actions/actionTypes";

const initialState = {
  products: [],
  product: []
}

function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload }
    case FETCH_PRODUCT_DETAIL:
      return { ...state, product: action.payload }
    default:
      return state
  }
}

export default productReducer;