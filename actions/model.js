import { LOAD_MODELS } from '../constants/actionTypes'

export function loadModels(payload) {
  return {
    type: LOAD_MODELS,
    payload
  }
}

export function dummy() {

}
