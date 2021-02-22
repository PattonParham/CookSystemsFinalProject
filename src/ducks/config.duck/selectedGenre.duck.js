export const SELECT_GENRE = 'cooksys/whos-who/ducks/config/selectedGenre/SELECT_GENRE'

/* REDUCER */

export default (selectedGenre = '', { type, payload }) => {
  switch (type) {
    case SELECT_GENRE:
      return payload
    default:
      return selectedGenre
  }
}

/* ACTION CREATORS */

export const selectGenre = genre => ({
  type: SELECT_GENRE,
  payload: genre
})