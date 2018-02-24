import { SET_CURRENT_MENU, SET_SEARCH_KEYWORD, SET_MODEL } from '../constants/actionTypes'

export function setCurrentMenu(payload) {
  return {
    type: SET_CURRENT_MENU,
    payload
  }
}

export function setSearchKeyword(payload) {
  return {
    type: SET_SEARCH_KEYWORD,
    payload
  }
}

export function setModel(payload) {
  return {
    type: SET_MODEL,
    payload
  }
}
