import { fromJS } from 'immutable';

import {
  SET_SCREEN_SIZE,
  SET_SELECTED_IPHONE_MODEL,
  SET_IPHONE_MODEL,
  LOAD_IPHONE_MODEL,
  LOAD_IPHONE_MODEL_SUCCESS,
  LOAD_IPHONE_MODEL_ERROR,
} from 'constants/ActionTypes';

const initialState = fromJS({
  loading: {
    loadIphoneModel: false,
  },
  error: {
    loadIphoneModel: null,
  },
  payload: {
    width: null,
    selectedIphoneModel: null,
    iphoneModel: null,
  },
});

function global(state = initialState, action) {
  const { payload, error } = action;
  switch (action.type) {
    case LOAD_IPHONE_MODEL:
      return state
        .setIn(['loading', 'loadIphoneModel'], true)
        .setIn(['error', 'loadIphoneModel'], null)
        .setIn(['payload', 'iphoneModel'], null);
    case LOAD_IPHONE_MODEL_SUCCESS:
      return state
        .setIn(['loading', 'loadIphoneModel'], false)
        .setIn(['error', 'loadIphoneModel'], null)
        .setIn(['payload', 'iphoneModel'], payload);
    case LOAD_IPHONE_MODEL_ERROR:
      return state
        .setIn(['error', 'loadIphoneModel'], error)
        .setIn(['loading', 'loadIphoneModel'], false)
        .setIn(['payload', 'iphoneModel'], null);
    case SET_IPHONE_MODEL:
      return state
        .setIn(['payload', 'iphoneModel'], payload);
    case SET_SELECTED_IPHONE_MODEL:
      return state
        .setIn(['payload', 'selectedIphoneModel'], payload);
    case SET_SCREEN_SIZE:
      return state
        .setIn(['payload', 'width'], payload);
    default:
      return state;
  }
}

export default global;
