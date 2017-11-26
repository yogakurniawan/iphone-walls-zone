import { LOAD_CATEGORIES } from '../constants/actionTypes'

function category(state = {}, action) {
  const { payload, type } = action;
  switch (type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: payload
      }
    default:
      return state;
  }
}

export default category;
