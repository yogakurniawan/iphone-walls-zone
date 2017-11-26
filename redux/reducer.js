import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import clients from './clients'
import categories from './categories'

export default combineReducers({
  auth,
  clients,
  form: formReducer,
  categories
})
