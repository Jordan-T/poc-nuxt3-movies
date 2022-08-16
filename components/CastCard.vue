<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  cast: { type: Object as PropType<ApiCast>, required: true },
});
</script>

<template>
  <BaseCard class="c-cast-card">
    <template #image>
      <div class="c-cast-card__image-wrap">
        <img
          v-if="cast.profile_path"
          class="c-cast-card__image"
          :src="`https://image.tmdb.org/t/p/w500/${cast.profile_path}`"
          :alt="cast.name"
          loading="lazy"
          width="500"
          height="750"
        />
      </div>
    </template>

    <div class="c-cast-card__content">
      <p class="c-cast-card__title">
        <!-- <NuxtLink
          class="c-cast-card__link"
          :to="{ name: 'casts-castId', params: { castId: cast.id } }"
        > -->
        <strong>{{ cast.name }}</strong
        ><br />
        <span>{{ cast.character }}</span>
        <!-- </NuxtLink> -->
      </p>
    </div>

    <!--
    <p class="c-cast-card__description">{{ cast.overview }}</p>
    <p class="c-cast-card__released">
      Released:
      {{
        new Date(cast.release_date).toLocaleString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </p>
    <div class="c-cast-card__actions">
      <NuxtLink
        class="c-cast-card__button"
        :to="{ name: 'casts-castId', params: { castId: cast.id } }"
      >
        En savoir plus
      </NuxtLink>
    </div>
    -->
  </BaseCard>
</template>

<style lang="scss">
.c-cast-card {
  position: relative;

  &__image-wrap {
    overflow: hidden;
  }

  &__image {
    transition: transform $speed-slower ease-out;

    @supports (aspect-ratio: 1 / 1) {
      aspect-ratio: 500 / 750;
      height: auto;
    }
  }

  &__content {
    margin-top: space("000");
    margin-bottom: space("000");
    display: flex;
    align-items: center;
    min-height: 3.75em;
  }

  &__title {
    color: $t-text-strong;
    flex-grow: 1;
  }

  &__link {
    color: inherit;
    text-decoration: none;
    line-height: 1.25;
    transition: color $speed-slow;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
    }

    &:hover,
    &:focus {
      color: $t-primary;
    }

    &:focus-visible {
      outline: 1px solid $t-focus-ring;
      outline-offset: 1px;
    }
  }

  &:hover {
    .c-cast-card {
      &__image {
        transition-duration: $speed-slow;
        transform: scale(1.02);
      }
    }
  }
}
</style>
