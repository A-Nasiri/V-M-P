import { createStore } from 'vuex';
import moviesModule from './modules/movies/index';

export default createStore({
  modules: {
    movies: moviesModule
  }
});
