<script lang="ts" setup>
const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", page: number): void;
}>();
</script>

<template>
  <div class="c-pagination">
    <button
      v-if="props.modelValue > 1"
      class="c-pagination__btn"
      type="button"
      @click="emit('update:modelValue', props.modelValue - 1)"
    >
      &lt;
    </button>
    <span class="c-pagination__current">page {{ props.modelValue }}</span>
    <button
      class="c-pagination__btn"
      type="button"
      @click="emit('update:modelValue', props.modelValue + 1)"
    >
      &gt;
    </button>
  </div>
</template>

<style lang="scss">
.c-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: space(2);
  padding: space(4);

  &__current {
    padding: space(2);
  }

  &__btn {
    padding: space(2);
    border-radius: $radius;
    background: $t-surface-1;

    &:hover,
    &:focus {
      box-shadow: inset 0 0 0 2px $t-primary;
      outline: none;
    }
  }
}
</style>
