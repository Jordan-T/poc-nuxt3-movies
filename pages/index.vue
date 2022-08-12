<script lang="ts" setup>
const page = ref(1);
const nextPage = () => {
  page.value++;
};
const previousPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};
const {
  data: nowMovies,
  pending,
  error,
  refresh,
} = await useFetch<{ results: ApiMovie[] }>(
  () => `/api/movies?page=${page.value}`
);

watch(page, (value) => {
  refresh();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<template>
  <div>
    <NuxtLayout class="p-home" name="default">
      <h1 v-if="pending">Chargement...</h1>
      <h1 v-else-if="error">Erreur: {{ error }}</h1>

      <div class="p-home__section">
        <h1 class="h2 mb-4">
          Actuellement au cinéma<template v-if="page > 1">
            (page {{ page }})</template
          >
        </h1>
        <div v-if="nowMovies" class="p-home__list">
          <MovieCard
            v-for="movie in nowMovies.results"
            :movie="movie"
            :key="movie.title"
          />
        </div>
        <BasePagination v-model="page" />
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.p-home {
  &__section {
    padding: space(4);
  }

  &__list {
    display: grid;
    align-items: flex-start;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: space(4);
  }
}
</style>
