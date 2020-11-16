export default {
  movies(state) {
    return state.movies;
  },

  hasMovies(state) {
    return state.movies && state.movies.length > 0;
  },

  currentIndex(state) {
    return state.currentIndex;
  }
};
