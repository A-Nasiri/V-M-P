<template>
  <video
    ref="videoPlayer"
    controls
    width="640"
    height="264"
    class="video-js vjs-fluid vjs-default-skin vjs-big-play-centered vjs-show-big-play-button-on-pause"
  ></video>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video.min.js';
import 'video.js/dist/video-js.min.css';

export default {
  name: 'VideoPlayer',
  props: {
    options: {
      type: Object
    }
  },
  setup(props) {
    const videoPlayer = ref(null);
    const player = ref(null);

    onMounted(() => {
      player.value = videojs(
        videoPlayer.value,
        props.options,
        function onPlayerReady() {
          console.log('player is ready', player.value);
        }
      );
    });

    onBeforeUnmount(() => {
      if (player.value) {
        player.value.dispose();
      }
    });

    return {
      videoPlayer
    };
  }
};
</script>

<style>
.video-js .vjs-big-play-button .vjs-icon-placeholder:before {
  content: '';
  background-image: url('../../../assets/btn-play.png');
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 55% calc(50% - 0px);
  border: none !important;
  box-shadow: none !important;
}
</style>
