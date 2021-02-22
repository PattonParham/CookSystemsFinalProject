import { combineReducers } from 'redux'

import { loadToken } from './token.duck'

import token from './token.duck'
import loading from './loading.duck'
import error from './error.duck'

/* AUTH REDUCER */

export default combineReducers({
  token,
  loading,
  error
})

/* ACTION CREATORS */
export { loadToken }

/* SELECTORS */

export const getToken = ({ auth }) => auth.token
export const getAuthLoading = ({ auth }) => auth.loading
export const getAuthError = ({ auth }) => auth.error
