<template>
  <div class="c-circle-progress" :style="`--_progress:${internalProgress}`">
    <div class="c-circle-progress__progress">
      <svg
        height="100%"
        viewBox="0 0 20 20"
        width="100%"
        style="overflow: visible"
      >
        <circle cx="50%" cy="50%" fill="none" stroke-width="2" r="9"></circle>
        <circle
          cx="50%"
          cy="50%"
          fill="none"
          stroke-width="2"
          r="9"
          stroke-linecap="round"
        ></circle>
      </svg>
    </div>

    <div v-if="$slots.default" class="c-circle-progress__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  /** The value from 0 to 10 */
  progress: { type: Number, required: true },
});

const internalProgress = computed(() => {
  const stepSize = 5;

  if (props.progress <= 0) {
    return 0;
  }
  if (props.progress <= stepSize) {
    return stepSize;
  }
  if (props.progress > 100) {
    return 100;
  }
  return Math.floor(props.progress / stepSize) * stepSize;
});
</script>

<style lang="scss">
.c-circle-progress {
  --_background: currentColor;
  --_background-opacity: 0.3;
  --_color: currentColor;
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100px;

  &__progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);

    circle {
      &:nth-child(1) {
        stroke: var(--_background);
        opacity: var(--_background-opacity);
      }

      &:nth-child(2) {
        stroke: var(--_color);
        transition: $speed ease-out;
        stroke-dashoffset: calc((100 - var(--_progress)) * 0.565487);
        stroke-dasharray: 56.5487;
      }
    }
  }
}
</style>
