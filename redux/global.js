import { SET_CURRENT_MENU } from '../constants/actionTypes'

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
    default:
      return state;
  }
}

export default global;
