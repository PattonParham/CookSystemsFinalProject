import { LOAD_GENRES_FAILED, LOAD_GENRES_STARTED, LOAD_GENRES_SUCCESS } from './genres.duck'

export default (loading = false, { type }) => {
  switch (type) {
    case LOAD_GENRES_STARTED:
      return true
    case LOAD_GENRES_FAILED:
    case LOAD_GENRES_SUCCESS:
      return false
    default:
      return loading
  }
}