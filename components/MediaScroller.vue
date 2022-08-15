<template>
  <div class="c-media-scroller">
    <slot />
  </div>
</template>

<style lang="scss">
/** @see https://github.com/argyleink/gui-challenges/blob/main/media-scroller/style.css */
.c-media-scroller {
  --size: 150px;
  --gap: #{space(4)};

  display: grid;
  grid-auto-flow: column;
  gap: calc(var(--gap) / 2);
  margin: 0;
  justify-content: flex-start;

  padding-inline: var(--gap);
  padding-block: calc(var(--gap) / 2);

  overflow-x: auto;
  overscroll-behavior-inline: contain;
  scroll-snap-type: inline mandatory;
  scroll-padding-left: var(--gap);
  scroll-padding-right: var(--gap);
  scroll-padding-inline: var(--gap);

  @media (prefers-reduced-motion: no-preference) {
    & {
      scroll-behavior: smooth;
    }
  }

  & > * {
    position: relative;
    scroll-snap-align: start;
    width: var(--size);

    /*  container padding fix  */
    &:last-child {
      &::after {
        content: "";
        position: absolute;

        inline-size: var(--gap);
        block-size: 100%;

        inset-block-start: 0;
        inset-inline-end: calc(var(--gap) * -1);
      }
    }
  }
}
</style>
