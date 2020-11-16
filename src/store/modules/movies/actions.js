import axios from 'axios';

export default {
  async fetchMovies(context) {
    try {
      const response = await axios.get(
        'http://hybridtv.ss7.tv/techtest/movies.json'
      );

      const {
        data: { data }
      } = response;
      context.commit('setMovies', data);
    } catch (error) {
      console.log(error);
    }
  }
};
