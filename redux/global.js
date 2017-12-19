import { SET_CURRENT_MENU, SET_SEARCH_KEYWORD, SET_MODEL } from '../constants/actionTypes'

function global(state = {
  menu: 'home',
  model: 'iphone6'
}, action) {
  const { payload, type } = action;
  switch (type) {
    case SET_CURRENT_MENU:
      return {
        ...state,
        menu: payload
      }
    case SET_SEARCH_KEYWORD:
      return {
        ...state,
        keyword: payload
      }
    case SET_MODEL:
      return {
        ...state,
        model: payload
      }
    default:
      return state;
  }
}

export default global;
