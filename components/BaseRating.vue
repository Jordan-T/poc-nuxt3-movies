<script lang="ts" setup>
const props = defineProps({
  /** The value from 0 to 10 */
  rating: { type: Number, required: true },
});

const displayedRating = computed(() => Math.floor(props.rating * 10) / 10);
</script>

<template>
  <BaseCircularProgress
    :progress="rating * 10"
    class="c-rating"
    :class="{ 'c-rating--danger': rating < 5 }"
  >
    {{ displayedRating }}
  </BaseCircularProgress>
</template>

<style lang="scss">
.c-rating {
  color: $t-success;
  width: 2rem;
  font-size: 0.75rem;

  &--danger {
    color: $t-danger;
  }
}
</style>
