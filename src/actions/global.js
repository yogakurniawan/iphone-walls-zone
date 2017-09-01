import {
  SET_SCREEN_SIZE,
  SET_SELECTED_IPHONE_MODEL,
  SET_IPHONE_MODEL,
  LOAD_IPHONE_MODEL,
} from 'constants/ActionTypes';
import request from 'utils/request';
import {
  BASE_API_URL,
} from 'constants/index';

const IPHONE_MODELS_API = `${BASE_API_URL}/IphoneModels`;

export function setScreenSize(width) {
  return {
    type: SET_SCREEN_SIZE,
    payload: width,
  };
}

export function setSelectedIphoneModel(id) {
  return {
    type: SET_SELECTED_IPHONE_MODEL,
    payload: id,
  };
}

export function setIphoneModel(model) {
  return {
    type: SET_IPHONE_MODEL,
    payload: model,
  };
}

export function getIphoneModelById({ id }) {
  return {
    type: LOAD_IPHONE_MODEL,
    promise: request(`${IPHONE_MODELS_API}/${id}`),
  };
}
