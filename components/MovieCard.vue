<script lang="ts" setup>
import type { PropType } from "vue";

defineProps({
  movie: { type: Object as PropType<ApiMovie>, required: true },
});
</script>

<template>
  <BaseCard class="c-movie-card">
    <template #image>
      <div class="c-movie-card__image-wrap">
        <img
          class="c-movie-card__image"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.title"
          loading="lazy"
          width="500"
          height="750"
        />
      </div>
    </template>

    <p class="c-movie-card__title">
      <NuxtLink
        class="c-movie-card__link"
        :to="{ name: 'movies-movieId', params: { movieId: movie.id } }"
      >
        {{ movie.title }}
      </NuxtLink>
    </p>

    <BaseRating class="c-movie-card__review" :rating="movie.vote_average" />

    <!--
    <p class="c-movie-card__description">{{ movie.overview }}</p>
    <p class="c-movie-card__released">
      Released:
      {{
        new Date(movie.release_date).toLocaleString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      }}
    </p>
    <div class="c-movie-card__actions">
      <NuxtLink
        class="c-movie-card__button"
        :to="{ name: 'movies-movieId', params: { movieId: movie.id } }"
      >
        En savoir plus
      </NuxtLink>
    </div>
    -->
  </BaseCard>
</template>

<style lang="scss">
.c-movie-card {
  position: relative;

  &__image-wrap {
    overflow: hidden;
  }

  &__image {
    transition: transform $speed-slower ease-out;
  }

  &__title {
    color: $t-text-strong;
  }

  &__link {
    color: inherit;
    text-decoration: none;
    transition: color $speed-slow;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
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
    .c-movie-card {
      &__image {
        transition-duration: $speed-slow;
        transform: scale(1.02);
      }
    }
  }
}
</style>
