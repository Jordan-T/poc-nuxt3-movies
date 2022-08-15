<script lang="ts" setup>
const visibleVideo = ref(false);
const videoSelected = ref<null | ApiVideo>(null);
const showVideo = (video: ApiVideo) => {
  visibleVideo.value = true;
  videoSelected.value = video;
};

const route = useRoute();
const movieId = computed(() => Number(route.params.movieId));
const {
  data: movie,
  pending,
  error,
} = await useAsyncData<ApiMovieDetail>(`movie-${movieId.value}`, () =>
  $fetch(`/api/movies/${movieId.value}`)
);

const allVideos = computed(() => {
  return movie.value.videos ? movie.value.videos.results : [];
});

const mainVideos = computed(() => {
  return allVideos.value.slice(0, 3);
});

const statusText = computed(() => {
  switch (movie.value.status) {
    case "Rumored":
      return "Révélé";
    case "Planned":
      return "Planifié";
    case "In Production":
      return "En production";
    case "Post Production":
      return "Post-production";
    // not display released status
    // case "Released":
    //   return "Sorti";
    case "Canceled":
      return "Annulé";
    default:
      return "";
  }
});
</script>

<template>
  <div>
    <h1 v-if="pending">Chargement...</h1>
    <h1 v-else-if="error">Erreur: {{ error }}</h1>
    <NuxtLayout v-else class="p-movie" name="default">
      <template #sidebar>
        <img
          v-if="movie.poster_path"
          class=""
          :src="`https://image.tmdb.org/t/p/original/${movie.poster_path}`"
          :alt="movie.title"
          loading="lazy"
          width="500"
          height="750"
        />
        <div class="py-4 px-4">
          <h1 class="h3 mb-4">{{ movie.title }}</h1>
          <p class="p-movie__sidebar-sub-title">Date de sortie</p>
          <p>
            {{
              new Date(movie.release_date).toLocaleString("fr-fr", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            }}
          </p>

          <p class="p-movie__sidebar-sub-title">Durée</p>
          <p>{{ movie.runtime }} minutes</p>

          <p class="p-movie__sidebar-sub-title">Titre original</p>
          <p>{{ movie.original_title }}</p>

          <template v-if="statusText">
            <p class="p-movie__sidebar-sub-title">Status</p>
            <p>{{ statusText }}</p>
          </template>
        </div>
      </template>

      <div class="p-movie__content">
        <div class="p-movie__top">
          <img
            v-if="movie.backdrop_path"
            class="p-movie__main-image"
            :src="`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`"
            :alt="movie.title"
            loading="lazy"
            width="1920"
            height="1080"
          />

          <div v-if="mainVideos.length" class="p-movie__medias">
            <h3 class="h3 mb-3">Médias</h3>
            <div class="p-movie__video-list">
              <VideoPreviewCard
                v-for="video in mainVideos"
                :key="video.id"
                class="p-movie__video"
                tag="button"
                type="button"
                :video="video"
                @click="showVideo(video)"
              />
            </div>

            <BaseDialog v-model="visibleVideo" @close="videoSelected = null">
              <template #title>Médias de {{ movie.title }}</template>

              <VideoCarousel
                :videos="allVideos"
                :current-index="allVideos.indexOf(videoSelected)"
              />

              <!-- <VideoPlayer
                v-if="videoSelected"
                :video="videoSelected"
                autoplay
              /> -->
            </BaseDialog>
          </div>
        </div>

        <div class="p-movie__details">
          <div class="p-movie__section">
            <h3 class="h3 mb-3">Notes</h3>
            <BaseRating class="p-movie__review" :rating="movie.vote_average" />
          </div>

          <div class="p-movie__section">
            <h3 class="h3 mb-3">Synopsis</h3>
            <p class="p-movie__description">{{ movie.overview }}</p>
          </div>

          <div v-if="movie.similar.results.length" class="p-movie__section">
            <h3 class="h3 mb-3">Titre similaire</h3>
            <div class="p-movie__similar-wrap">
              <MediaScroller class="p-movie__similar">
                <MovieCard
                  v-for="similarMovie in movie.similar.results"
                  :movie="similarMovie"
                  :key="similarMovie.title"
                />
              </MediaScroller>
            </div>
          </div>
        </div>
      </div>

      <!-- TODO: remove -->
      <details class="px-4">
        <summary class="has-text-warning">Detail of API data</summary>
        <pre :style="{ width: 'calc(100vw - 500px)', overflow: 'auto' }">{{
          movie
        }}</pre>
      </details>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.p-movie {
  &__sidebar-sub-title {
    margin: space(8) 0 space(2);
    text-transform: uppercase;
    font-size: $font-size-base;
    line-height: $header-line-height;
    font-family: $family-heading;
    font-weight: 400;
  }

  &__top {
    position: relative;
  }

  &__main-image {
    object-fit: cover;
    height: 80vh;
  }

  &__medias {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10rem space(4) space(3);
    color: $t-text-white;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  &__video-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: space(4);
    justify-content: center;
  }

  &__section {
    padding: space(4);
  }

  &__similar {
    // temp fix overflow (l-default__main > flex)
    &-wrap {
      display: flex;
    }

    flex-basis: 0;
    flex-grow: 1;
    width: 0;
    // end temp fix

    --gap: #{space(4)};
    --size: 200px;
    gap: space(4);
    padding-top: space(4);
    padding-bottom: space(4);
    margin: calc(space(4) * -1) calc(space(4) * -1) 0;
  }
}
</style>
