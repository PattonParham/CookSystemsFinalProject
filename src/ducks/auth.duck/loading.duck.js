import { GET_TOKEN_STARTED, GET_TOKEN_SUCCESS, GET_TOKEN_FAILED } from './token.duck'

export default (loading = false, { type }) => {
  switch (type) {
    case GET_TOKEN_STARTED:
      return true
    case GET_TOKEN_SUCCESS:
    case GET_TOKEN_FAILED:
      return false
    default:
      return loading
  }
}