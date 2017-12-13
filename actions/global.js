import { SET_CURRENT_MENU } from '../constants/actionTypes'

export function setCurrentMenu(payload) {
  return {
    type: SET_CURRENT_MENU,
    payload
  };
}