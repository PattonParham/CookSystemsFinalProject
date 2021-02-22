import { GET_TOKEN_STARTED, GET_TOKEN_SUCCESS, GET_TOKEN_FAILED } from './token.duck'

export default (error = false, { type, payload }) => {
  switch (type) {
    case GET_TOKEN_SUCCESS:
    case GET_TOKEN_STARTED:
      return false
    case GET_TOKEN_FAILED:
      return payload
    default:
      return error
  }
}