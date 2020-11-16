export default {
  setMovies(state, payload) {
    state.movies = payload;
  },

  nextIndex(state) {
    if (state.currentIndex < state.movies.length - 1) state.currentIndex++;
  },

  prevIndex(state) {
    if (state.currentIndex > 0) state.currentIndex--;
  }
};
