import { computed, onMounted, onUnmounted, ref } from 'vue';

export default function useBreakpoints() {
  let windowWidth = ref(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));

  const indexToCut = computed(() => {
    if (windowWidth.value > 550 && windowWidth.value < 860) return 8;
    if (windowWidth.value > 860) return 7;
  });

  const width = computed(() => windowWidth.value);

  return { width, indexToCut };
}
