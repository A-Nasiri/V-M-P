import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import Home from '@/views/Home.vue';
import Carousel from '@/components/carousel/Carousel.vue';

describe('Home', () => {
  it('initializes with correct elements', () => {
    const wrapper = mount(Home);
    expect(wrapper.exists()).toBe(true);
  });

  it('Dispatches vuex action when created', () => {
    const store = createStore();
    store.dispatch = jest.fn();

    const wrapper = mount(Home, {
      global: {
        plugins: [store]
      }
    });

    expect(store.dispatch).toHaveBeenCalledWith('movies/fetchMovies');
  });
});
