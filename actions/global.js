import { SET_CURRENT_MENU, SET_SEARCH_KEYWORD } from '../constants/actionTypes'

export function setCurrentMenu(payload) {
  return {
    type: SET_CURRENT_MENU,
    payload
  };
}

export function setSearchKeyword(payload) {
  return {
    type: SET_SEARCH_KEYWORD,
    payload
  };
}