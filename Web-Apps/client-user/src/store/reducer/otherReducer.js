import { HIDELOAD, SHOWLOAD } from "../action/actionType"

const initialState = {
  isLoad: false
}

export default function otherReducer(state = initialState, action) {
  switch (action.type) {
    case SHOWLOAD:
      return {
        ...state,
        isLoad: true
      }
    case HIDELOAD:
        return {
          ...state,
          isLoad: false
        }
    default:
      return state
  }
}