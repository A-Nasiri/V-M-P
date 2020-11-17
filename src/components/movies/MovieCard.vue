<template>
  <figure class="card">
    <img :src="item.poster" :alt="item.title" />
    <figcaption>
      <h1>{{ item.title }}</h1>
      <router-link class="link" :to="link"></router-link>
    </figcaption>
  </figure>
</template>

<script>
import { computed } from 'vue';
import slugify from 'slugify';

export default {
  props: ['item'],
  setup(props) {
    const link = computed(() => slugify(props.item.title));

    return {
      link
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  width: 400px;
  height: 600px;
  margin: 10px 10px;
  background-color: #efefef;
  overflow: hidden;
  transition: all 0.5s ease;
  cursor: pointer;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  h1 {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 2em;
    width: 100%;
    opacity: 0;
    -webkit-transform: translate3d(0, 10px, 0);
    transform: translate3d(0, 10px, 0);
  }

  .link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  figcaption {
    padding: 2em;
    color: #fff;
    text-transform: uppercase;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;

    & > a {
      z-index: 1000;
      text-indent: 200%;
      white-space: nowrap;
      font-size: 0;
      opacity: 0;
    }

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: -webkit-linear-gradient(
        top,
        rgba(72, 76, 97, 0) 0%,
        rgba(72, 76, 97, 0.8) 75%
      );
      background: linear-gradient(
        to bottom,
        rgba(72, 76, 97, 0) 0%,
        rgba(72, 76, 97, 0.8) 75%
      );
      content: '';
      border: var(--focus-line);
      opacity: 0;
      -webkit-transform: translate3d(0, 50%, 0);
      transform: translate3d(0, 50%, 0);
    }
  }
  &:hover figcaption::before,
  &:hover h1 {
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    transition: opacity 0.35s, transform 0.35s;
  }

  &:hover figcaption::before,
  &:hover h1 {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
