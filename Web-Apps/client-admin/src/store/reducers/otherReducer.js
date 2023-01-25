import { CLOSE_LOAD, CLOSE_SHOW_IMAGES, OPEN_LOAD, OPEN_SHOW_IMAGES } from "../actions/actionTypes";

const initialState = {
  showImagesOpened: false,
  isLoad: false
}

function otherReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_SHOW_IMAGES:
      return {
        ...state,
        showImagesOpened: true
      }
    case CLOSE_SHOW_IMAGES:
      return {
        ...state,
        showImagesOpened: false
      }
    case OPEN_LOAD:
      return {
        ...state,
        isLoad: true
      }
    case CLOSE_LOAD:
      return {
        ...state,
        isLoad: false
      }
    default:
      return state
  }
}

export default otherReducer;