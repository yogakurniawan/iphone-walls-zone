import {
  LOAD_IPHONE_MODELS,
  SET_IPHONE_MODELS,
} from 'constants/ActionTypes';
import request from 'utils/request';
import {
  BASE_API_URL,
} from 'constants/index';

const IPHONE_MODELS_API = `${BASE_API_URL}/IphoneModels`;

export function getIphoneModels() {
  return {
    type: LOAD_IPHONE_MODELS,
    promise: request(IPHONE_MODELS_API),
  };
}

export function setIphoneModels(models) {
  return {
    type: SET_IPHONE_MODELS,
    payload: models,
  };
}
