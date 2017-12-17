import { SET_CURRENT_MENU, SET_SEARCH_KEYWORD } from '../constants/actionTypes'

function global(state = {
  menu: 'home'
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
    default:
      return state;
  }
}

export default global;
