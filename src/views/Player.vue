<template>
  <div class="player">
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
  max-height: 500px;
  width: 100%;
  max-width: 1000px;
  margin: 3rem auto;
}
</style>
