import getters from './getters';
import actions from './actions';
import mutations from './mutations';

export default {
  namespaced: true,
  state() {
    return {
      currentIndex: 0,
      movies: []
    };
  },
  getters,
  actions,
  mutations
};
