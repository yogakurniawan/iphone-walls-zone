import { LOAD_CATEGORIES } from '../constants/actionTypes'

export function loadCategories(payload) {
  return {
    type: LOAD_CATEGORIES,
    payload
  };
}

export function dummy() {

}
