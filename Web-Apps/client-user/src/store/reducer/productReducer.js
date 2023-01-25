import { FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCT_DETAIL } from "../action/actionType"

const initialState = {
  products: [],
  product: {}
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload
      }
    case FETCH_PRODUCT_DETAIL:
      return {
        ...state,
        product: action.payload
      }
    default:
      return state
  }
}