import { combineReducers } from 'redux'

import config from './config.duck'
import auth from './auth.duck'

export default combineReducers({
  config,
  auth
})
