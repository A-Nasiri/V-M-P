<template>
  <div class="home">
    <div class="loader" v-if="isLoading">
      <loader />
    </div>
    <carousel
      v-else-if="hasMovies"
      :items="movies"
      :listLength="listLength"
      :currentIndex="currentIndex"
      @change-index="changeIndex"
    >
      <template v-slot:item="{ item }">
        <movie-card :item="item" />
      </template>
    </carousel>
    <h1 class="error-message" v-else>No Movies Found...</h1>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

import MovieCard from '../components/movies/MovieCard.vue';
import Carousel from '../components/carousel/Carousel.vue';
import Loader from '../components/loader/Loader.vue';

export default {
  name: 'Home',
  components: {
    Carousel,
    MovieCard,
    Loader
  },
  setup() {
    const store = useStore();
    const isLoading = ref(true);
    const error = ref(null);
    //function to reach out to the store and fetch the movies from the API
    const fetchMovies = async () => {
      isLoading.value = true;
      try {
        await store.dispatch('movies/fetchMovies');
      } catch (err) {
        error.value = err.message || 'Something went wrong!';
      }
      isLoading.value = false;
    };

    //Function to reach store and mutate the index based on event emited from Carousel
    const changeIndex = (direction) => {
      if (direction === 'prev') {
        store.commit('movies/prevIndex');
      } else {
        store.commit('movies/nextIndex');
      }
    };

    fetchMovies();

    const movies = computed(() => store.getters['movies/movies']);
    const hasMovies = computed(() => store.getters['movies/hasMovies']);
    const currentIndex = computed(() => store.getters['movies/currentIndex']);
    const listLength = computed(() => {
      return { width: movies.value.length * 100 + '%' };
    });

    return {
      fetchMovies,
      listLength,
      movies,
      currentIndex,
      changeIndex,
      hasMovies,
      isLoading,
      error
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}
</style>
