import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Home from '@/views/Home.vue';
import Carousel from '@/components/carousel/Carousel.vue';
import MovieCard from '@/components/movies/MovieCard.vue';

describe('Home', () => {
  describe('Behaviour test for unsuccessful data from the store', () => {
    let wrapper;
    let store;
    beforeEach(() => {
      store = createStore({
        modules: {
          movies: {
            namespaced: true,
            state() {
              return {
                currentIndex: 0,
                movies: []
              };
            },
            actions: {
              fetchMovies: jest.fn()
            }
          }
        }
      });

      store.dispatch = jest.fn();

      wrapper = mount(Home, {
        global: {
          plugins: [store]
        }
      });
    });

    afterEach(() => {
      wrapper = null;
    });

    it('Dispatches vuex action when created', () => {
      expect(store.dispatch).toHaveBeenCalledWith('movies/fetchMovies');
    });

    it('Renders the correct components and elements', () => {
      expect(wrapper.find('.loader').exists()).toBe(false);

      expect(wrapper.find('.error-message').exists()).toBe(true);
      expect(wrapper.find('.error-message').text()).toBe('No Movies Found...');
    });
  });

  describe('Behaviour test for getting successful data from the store', () => {
    let wrapper;
    let store;
    beforeEach(() => {
      store = createStore({
        modules: {
          movies: {
            namespaced: true,
            state() {
              return {
                currentIndex: 0,
                movies: [
                  {
                    title: 'Parasite',
                    poster: 'ksjskjskjnsksjskjskj.jpg',
                    video: 'dbdjbdkbdkjdkdb.mp4'
                  },
                  {
                    title: 'Batman',
                    poster: 'ksjskfggfkjnsksjskjskj.jpg',
                    video: 'dbdjbdkbffdkjdkdb.mp4'
                  }
                ]
              };
            },
            getters: {
              movies: (state) => state.movies,
              hasMovies: (state) => state.movies && state.movies.length > 0,
              currentIndex: (state) => state.currentIndex
            },
            actions: {
              fetchMovies: jest.fn()
            }
          }
        }
      });

      store.dispatch = jest.fn();
      store.commit = jest.fn();

      wrapper = mount(Home, {
        global: {
          plugins: [store]
        }
      });
    });

    afterEach(() => {
      wrapper = null;
    });

    it('Dispatches vuex action when created', () => {
      expect(store.dispatch).toHaveBeenCalledWith('movies/fetchMovies');
    });

    it('Renders the correct components and elements', () => {
      expect(wrapper.find('.loader').exists()).toBe(false);

      expect(wrapper.find('.error-message').exists()).toBe(false);

      expect(wrapper.findComponent(Carousel).exists()).toBe(true);
      expect(wrapper.findComponent(MovieCard).exists()).toBe(true);
    });

    it('Commits to the store when change-index event is emitted from the Carousel with the correct payload', () => {
      wrapper.findComponent(Carousel).vm.$emit('change-index', 'next');
      expect(store.commit).toHaveBeenCalledWith('movies/nextIndex');
    });
  });
});
