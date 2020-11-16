<template>
  <div class="carousel" ref="element">
    <ul :style="listLength">
      <li v-for="(item, index) in items" :key="index" :style="listPosition">
        <slot name="item" :item="item"></slot>
      </li>
    </ul>
    <carousel-control
      mode="left"
      v-if="currentIndex > 0"
      @click="changeIndex('prev')"
    />
    <carousel-control mode="right" @click="changeIndex('next')" />
  </div>
</template>

<script>
import { computed, ref, reactive, onMounted } from 'vue';
import CarouselControl from './CarouselControl';

export default {
  name: 'Carousel',
  components: { CarouselControl },
  props: {
    items: {
      type: Array,
      required: true
    },
    listLength: {
      type: Object,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const element = ref(null);
    const touch = reactive({
      startX: 0,
      endX: 0
    });

    //Function to emit an event for the delegation of index state change in the parent component
    const changeIndex = (direction) => {
      emit('change-index', direction);
    };

    //Functionality for carousel touch/swipe events
    const touchstart = (event) => {
      touch.startX = event.touches[0].clientX;
      touch.endX = 0;
    };

    const touchmove = (event) => {
      touch.endX = event.touches[0].clientX;
    };

    const touchend = () => {
      if (!touch.endX || Math.abs(touch.endX - touch.startX) < 20) return;

      if (touch.endX < touch.startX) {
        changeIndex('next');
      } else {
        changeIndex('prev');
      }
    };

    onMounted(() => {
      element.value.addEventListener('touchstart', (event) =>
        touchstart(event)
      );
      element.value.addEventListener('touchmove', (event) => touchmove(event));
      element.value.addEventListener('touchend', () => touchend());
    });

    const listPosition = computed(() => {
      return {
        transform: 'translateX(-' + props.currentIndex * 100 + '%)'
      };
    });

    return {
      listPosition,
      element,
      touchend,
      touchstart,
      touchmove,
      changeIndex
    };
  }
};
</script>

<style lang="scss" scoped>
.carousel {
  position: relative;
  overflow: hidden;

  ul {
    display: flex;
    list-style: none;
  }
  li {
    transition: all 0.5s ease;
  }
}
</style>
