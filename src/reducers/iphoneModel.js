import { fromJS } from 'immutable';

import {
  LOAD_IPHONE_MODELS,
  LOAD_IPHONE_MODELS_SUCCESS,
  LOAD_IPHONE_MODELS_ERROR,
  SET_IPHONE_MODELS,
} from 'constants/ActionTypes';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: null,
  payload: {
    iphoneModels: [],
  },
});

function iphoneModel(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case LOAD_IPHONE_MODELS:
      return state
        .set('loading', true)
        .set('error', null)
        .setIn(['payload', 'iphoneModels'], []);
    case LOAD_IPHONE_MODELS_SUCCESS:
      return state
        .setIn(['payload', 'iphoneModels'], payload)
        .set('loading', false)
        .set('error', null);
    case SET_IPHONE_MODELS:
      return state
        .setIn(['payload', 'iphoneModels'], payload);
    case LOAD_IPHONE_MODELS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .setIn(['payload', 'iphoneModels'], []);
    default:
      return state;
  }
}

export default iphoneModel;

