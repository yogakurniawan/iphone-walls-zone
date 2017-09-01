import { fromJS } from 'immutable';

import {
  LOAD_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_ERROR,
  LOAD_CATEGORY_BY_NAME,
  SET_SELECTED_CATEGORY,
  LOAD_CATEGORY_BY_NAME_ERROR,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: {
    loadCategories: false,
    loadCategoryByName: false,
  },
  error: {
    loadCategories: null,
    loadCategoryByName: null,
  },
  payload: {
    categories: [],
    selectedCategory: {
      name: '',
      id: null,
      total: 0,
    },
  },
});

function category(state = initialState, action) {
  const { payload, error } = action;
  switch (action.type) {
    case LOAD_CATEGORIES:
      return state
        .setIn(['loading', 'loadCategories'], true)
        .setIn(['error', 'loadCategories'], null)
        .setIn(['payload', 'categories'], []);
    case LOAD_CATEGORIES_SUCCESS:
      return state
        .setIn(['loading', 'loadCategories'], false)
        .setIn(['error', 'loadCategories'], null)
        .setIn(['payload', 'categories'], payload.categories);
    case LOAD_CATEGORIES_ERROR:
      return state
        .setIn(['error', 'loadCategories'], error)
        .setIn(['loading', 'loadCategories'], false)
        .setIn(['payload', 'categories'], []);
    case LOAD_CATEGORY_BY_NAME:
      return state
        .setIn(['loading', 'loadCategoryByName'], true)
        .setIn(['error', 'loadCategoryByName'], null)
        .setIn(['payload', 'selectedCategory'], initialState.payload.selectedCategory);
    case SET_SELECTED_CATEGORY:
      return state
        .setIn(['loading', 'loadCategoryByName'], false)
        .setIn(['error', 'loadCategoryByName'], null)
        .setIn(['payload', 'selectedCategory'], payload.category);
    case LOAD_CATEGORY_BY_NAME_ERROR:
      return state
        .setIn(['error', 'loadCategoryByName'], error)
        .setIn(['loading', 'loadCategoryByName'], false)
        .setIn(['payload', 'selectedCategory'], initialState.payload.selectedCategory);
    default:
      return state;
  }
}

export default category;
