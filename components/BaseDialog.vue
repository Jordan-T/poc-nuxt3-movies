<script lang="ts" setup>
import type Dialog from "a11y-dialog";
import uniqueId from "lodash/uniqueId";
import { A11yDialog } from "vue-a11y-dialog";

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", visible: boolean): void;
  (e: "close"): void;
}>();

defineComponent(A11yDialog);

const dialogId = uniqueId("dialog-");
const dialogRef = ref<null | Dialog>(null);
const assignDialogRef = (dialog: Dialog | null) => {
  dialogRef.value = dialog;

  if (dialog == null) {
    return;
  }

  dialog.on("hide", () => {
    setTimeout(() => {
      emit("update:modelValue", false);
      emit("close");
      dialog.destroy();
    }, 300);
  });

  if (props.modelValue) {
    dialogRef.value.show();
  }
};
watch(props, (modelValue) => {
  if (dialogRef.value == null) {
    return;
  }

  if (modelValue) {
    dialogRef.value.show();
  } else {
    dialogRef.value.hide();
  }
});

onBeforeUnmount(() => {
  if (dialogRef.value == null) {
    return;
  }
  dialogRef.value.destroy();
});
</script>

<template>
  <A11yDialog
    v-if="props.modelValue"
    :id="dialogId"
    @dialog-ref="assignDialogRef"
  >
    <template #title v-if="$slots.title"><slot name="title" /></template>
    <template #closeButtonContent v-if="$slots.closeButtonContent"
      ><slot name="closeButtonContent"
    /></template>
    <slot />
  </A11yDialog>
</template>

<style lang="scss">
/**
 * 1. Make the dialog container, and its child overlay spread across
 *    the entire window.
 */
.dialog-container,
.dialog-overlay {
  position: fixed; /* 1 */
  top: 0; /* 1 */
  right: 0; /* 1 */
  bottom: 0; /* 1 */
  left: 0; /* 1 */
}

/**
 * 1. Make sure the dialog container and all its descendants sits on
 *    top of the rest of the page.
 * 2. Make the dialog container a flex container to easily center the
 *    dialog.
 */
.dialog-container {
  z-index: 9; /* 1 */
  display: flex; /* 2 */
}

/**
 * 1. Make sure the dialog container and all its descendants are not
 *    visible and not focusable when it is hidden.
 */
.dialog-container[aria-hidden="true"] {
  // display: none; /* 1 */
  opacity: 0;
  visibility: hidden;
  transition: 200ms ease-out;
}

/**
 * 1. Make the overlay look like an overlay.
 */
.dialog-overlay {
  background-color: $t-backdrop-color; /* 1 */
}

/**
 * 1. Vertically and horizontally center the dialog in the page.
 * 2. Make sure the dialog sits on top of the overlay.
 * 3. Make sure the dialog has an opaque background.
 */
.dialog-content {
  margin: auto; /* 1 */
  z-index: 2; /* 2 */
  position: relative; /* 2 */
  background-color: $t-surface-1; /* 3 */
  border-radius: $radius;
  padding: space(4);
}

.dialog-close {
  position: absolute;
  top: 0;
  right: 0;
  padding: space(4);
  cursor: pointer;
}

.dialog-title {
  font-size: $font-size-xl;
  color: $t-text-strong;
  padding-right: space(6);
  margin-bottom: space(3);
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
}

@keyframes slide-up {
  from {
    transform: translateY(10%);
  }
}

.dialog-overlay {
  animation: fade-in 200ms both;

  // [aria-hidden="true"] & {
  //   opacity: 0;
  //   visibility: hidden;
  //   transition: 200ms ease-out;
  // }
}

/**
 * 1. Add an animation delay equal to the overlay animation duration to
 *    wait for the overlay to appear before animation in the dialog.
 */
.dialog-content {
  animation: fade-in 400ms 200ms both, slide-up 400ms 200ms both; /* 1 */

  // [aria-hidden="true"] & {
  //   opacity: 0;
  //   visibility: hidden;
  //   transition: 200ms ease-out;
  //   animation: none;
  // }
}
</style>
