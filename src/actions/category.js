import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORY_BY_NAME,
  SET_SELECTED_CATEGORY,
  LOAD_CATEGORY_BY_NAME_ERROR,
} from 'constants/ActionTypes';
import {
  BASE_API_URL,
} from 'constants/index';
import request from 'utils/request';

const CATEGORIES_API = `${BASE_API_URL}/Categories`;

export function loadCategories() {
  return {
    type: LOAD_CATEGORIES,
  };
}

export function loadCategoriesSuccess(categories) {
  return {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: {
      categories,
    },
  };
}

export function loadCategoriesError(error) {
  return {
    type: LOAD_CATEGORIES_ERROR,
    error,
  };
}

export function loadCategoryByName() {
  return {
    type: LOAD_CATEGORY_BY_NAME,
  };
}

export function setSelectedCategory(category) {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: {
      category,
    },
  };
}

export function loadCategoryByNameError(error) {
  return {
    type: LOAD_CATEGORY_BY_NAME_ERROR,
    error,
  };
}

export function getCategoryByName({ name }) {
  return (dispatch) => {
    dispatch(loadCategoryByName());
    const queryParams = {
      'filter[where][name]': name,
    };
    return request(CATEGORIES_API, { queryParams })
      .then(categories => dispatch(setSelectedCategory(categories[0])))
      .catch(error => dispatch(loadCategoryByNameError(error.message)));
  };
}

export function getCategories() {
  return (dispatch) => {
    dispatch(loadCategories());
    return request(CATEGORIES_API)
      .then(categories => dispatch(loadCategoriesSuccess(categories)))
      .catch(error => dispatch(loadCategoriesError(error.message)));
  };
}
