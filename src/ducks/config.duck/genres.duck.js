import fetchFromSpotify from '../../services/api'

export const LOAD_GENRES_STARTED = 'cooksys/whos-who/ducks/config/genres/LOAD_GENRES_STARTED'
export const LOAD_GENRES_FAILED = 'cooksys/whos-who/ducks/config/genres/LOAD_GENRES_FAILED'
export const LOAD_GENRES_SUCCESS = 'cooksys/whos-who/ducks/config/genres/LOAD_GENRES_SUCCESS'

export default (genres = [], { type, payload }) => {
  switch (type) {
    case LOAD_GENRES_STARTED:
      return []
    case LOAD_GENRES_SUCCESS:
      return payload
    case LOAD_GENRES_FAILED:
      return []
    default:
      return genres
  }
}

const loadGenresStarted = () => ({
  type: LOAD_GENRES_STARTED
})

const loadGenresSuccess = (genres) => ({
  type: LOAD_GENRES_SUCCESS,
  payload: genres
})

const loadGenresFailed = (error) => ({
  type: LOAD_GENRES_FAILED,
  payload: error
})

export const loadGenres = (token) => dispatch => {
  dispatch(loadGenresStarted())
  fetchFromSpotify({
    token,
    endpoint: 'recommendations/available-genre-seeds'
  })
    .then(({ genres }) => {
      return dispatch(loadGenresSuccess(genres))
    })
    .catch(error => dispatch(loadGenresFailed(error)))
}