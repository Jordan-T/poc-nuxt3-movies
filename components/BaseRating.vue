<script lang="ts" setup>
const props = defineProps({
  /** The value from 0 to 10 */
  rating: { type: Number, required: true },
});

const displayedRating = computed(() => Math.floor(props.rating * 10));
</script>

<template>
  <BaseCircularProgress
    :progress="rating * 10"
    class="c-rating"
    :class="{
      'c-rating--warning': rating < 7 && rating >= 5,
      'c-rating--danger': rating < 5,
    }"
  >
    {{ displayedRating }}<sup>%</sup>
  </BaseCircularProgress>
</template>

<style lang="scss">
.c-rating {
  color: $t-success;
  width: 2rem;
  font-size: 0.625rem;
  font-weight: 700;

  sup {
    font-size: 0.5em;
  }

  &--warning {
    color: $t-warning;
  }

  &--danger {
    color: $t-danger;
  }
}
</style>
