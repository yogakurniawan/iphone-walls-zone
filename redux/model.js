import { LOAD_MODELS } from '../constants/actionTypes'

function model(state = {}, action) {
  const { payload, type } = action;
  switch (type) {
    case LOAD_MODELS:
      return {
        ...state,
        models: payload
      }
    default:
      return state;
  }
}

export default model;
