import {
  LOAD_SPECIFICATION,
  LOAD_SPECIFICATION_SUCCESS,
  LOAD_SPECIFICATION_ERROR,
  SET_DEVICE_NAME,
} from 'constants/ActionTypes';

export function loadSpecification(brand, device) {
  return {
    type: LOAD_SPECIFICATION,
    payload: {
      brand,
      device,
    },
  };
}

export function loadSpecificationSuccess(specification) {
  return {
    type: LOAD_SPECIFICATION_SUCCESS,
    payload: {
      specification,
    },
  };
}

export function loadSpecificationError(error) {
  return {
    type: LOAD_SPECIFICATION_ERROR,
    error,
  };
}

export function setDeviceName(device) {
  return {
    type: SET_DEVICE_NAME,
    device,
  };
}
