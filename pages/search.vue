<script lang="ts" setup>
const route = useRoute();
const search = ref(route.query.q);

const {
  data: searchResult,
  error,
  pending,
  refresh,
} = await useAsyncData<{
  results: ApiMovie[];
}>(
  `search-${search.value}`,
  () => $fetch(`/api/movies/search/${search.value}`),
  {
    server: false,
  }
);

watch(route, () => {
  if (search.value !== route.query.q) {
    search.value = route.query.q;
    refresh();
  }
});

const foundMovies = computed(() => {
  if (
    !searchResult.value ||
    !searchResult.value.results ||
    !searchResult.value.results.length
  ) {
    return [];
  }
  return searchResult.value.results;
});
</script>

<template>
  <div>
    <NuxtLayout class="p-search" name="default">
      <div class="p-search__section">
        <h1 class="h2 mb-4">Résultats de recherche pour "{{ search }}"</h1>
        <ClientOnly>
          <div v-if="pending" class="p-search__loading">CHARGEMENT...</div>
          <div v-else-if="error" class="p-search__loading">ERROR</div>
          <div v-else-if="!foundMovies.length">NO RESULTS</div>
          <div v-else class="p-search__list">
            <MovieCard
              v-for="movie in foundMovies"
              :movie="movie"
              :key="movie.title"
            />
          </div>
        </ClientOnly>
      </div>
    </NuxtLayout>
  </div>
</template>

<style lang="scss">
.p-search {
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
