import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import wallpaper from './wallpaper'
import category from './category'

export default combineReducers({
  auth,
  wallpaper,
  form: formReducer,
  category
})
