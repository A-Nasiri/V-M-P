<template>
  <div class="player">
    <h1>{{ movie.title }}</h1>
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import VideoPlayer from '../components/video/VideoPlayer';

export default {
  name: 'Player',
  components: {
    VideoPlayer
  },
  setup() {
    const store = useStore();
    const { params } = useRoute();
    //Get the chosen movie from store
    const movie = computed(() => {
      const dash = /-/gi;
      const name = params.videoName.replace(dash, ' ');
      const movies = store.getters['movies/movies'];

      return movies.find(({ title }) => title === name);
    });

    //Options to pass to vide player
    const { video, poster } = movie.value;
    const videoOptions = reactive({
      poster: poster,
      sources: [{ src: video, type: 'video/mp4' }]
    });

    return {
      movie,
      videoOptions
    };
  }
};
</script>

<style lang="scss" scoped>
.player {
  max-height: 700px;
  width: 100%;
  max-width: 1000px;
  margin: 3rem auto;
  text-align: center;
  letter-spacing: 2px;
  font-size: 2rem;

  h1 {
    margin: 1rem 0;
  }

  @media (max-width: 900px) {
    font-size: 1rem;
  }
}
</style>
