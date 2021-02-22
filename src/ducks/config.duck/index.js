import { combineReducers } from 'redux'

import { loadGenres } from './genres.duck'
import { selectGenre } from './selectedGenre.duck'

import genres from './genres.duck'
import error from './error.duck'
import selectedGenre from './selectedGenre.duck'
import loading from './loading.duck'

/* CONFIG REDUCER */

export default combineReducers({
  genres,
  error,
  selectedGenre,
  loading
})

/* ACTION CREATORS */
export { loadGenres, selectGenre }

/* SELECTORS */

export const getGenres = ({ config }) => config.genres
export const getConfigError = ({ config }) => config.error
export const getSelectedGenre = ({ config }) => config.selectedGenre
export const getConfigLoading = ({ config }) => config.loading