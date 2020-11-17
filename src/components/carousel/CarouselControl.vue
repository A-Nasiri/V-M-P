<template>
  <button :class="getStyles"></button>
</template>

<script>
import { computed } from 'vue';
export default {
  name: 'CarouselControl',
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const getStyles = computed(() =>
      props.mode === 'left' ? 'left' : 'right'
    );

    return {
      getStyles
    };
  }
};
</script>

<style lang="scss" scoped>
.right {
  position: absolute;
  right: 0;
  top: 10px;
  bottom: 10px;
  background: rgba(17, 17, 17, 0.5);
  border: none;
  overflow: hidden;
  width: 48px;
  z-index: 1;
  cursor: pointer;

  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 28px;
    height: 28px;
    border-left: 2px solid #f5f5f5;
    border-bottom: 2px solid #f5f5f5;
    transform: translate(-75%, -50%) rotate(-135deg);
  }

  &:hover {
    background: rgba(17, 17, 17, 0.8);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 960px) {
    width: 40px;

    &::before {
      width: 14px;
      height: 14px;
    }
  }
}

.left {
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  background: rgba(17, 17, 17, 0.5);
  border: none;
  overflow: hidden;
  width: 48px;
  z-index: 1;
  cursor: pointer;

  &::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 50%;
    width: 28px;
    height: 28px;
    border-left: 2px solid #f5f5f5;
    border-bottom: 2px solid #f5f5f5;
    transform: translate(-25%, -50%) rotate(45deg);
  }

  &:hover {
    background: rgba(17, 17, 17, 0.8);
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 960px) {
    width: 40px;

    &::before {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
