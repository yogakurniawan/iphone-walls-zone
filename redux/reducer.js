import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import global from './global'
import wallpaper from './wallpaper'
import category from './category'
import model from './model'

export default combineReducers({
  global,
  wallpaper,
  form: formReducer,
  category,
  model
})
