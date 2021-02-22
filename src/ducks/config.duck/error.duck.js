import { LOAD_GENRES_FAILED, LOAD_GENRES_STARTED, LOAD_GENRES_SUCCESS } from './genres.duck'

export default (error = false, { type, payload }) => {
  switch (type) {
    case LOAD_GENRES_STARTED:
    case LOAD_GENRES_SUCCESS:
      return false
    case LOAD_GENRES_FAILED:
      return payload
    default:
      return error
  }
}