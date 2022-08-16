<script lang="ts" setup>
const route = useRoute();
const page = ref(route.query.page ? Number(route.query.page) : 1);
watch(page, (value) => {
  const router = useRouter();
  router.push({
    path: route.path,
    query: { page: value === 1 ? undefined : value },
  });
});
watch(
  () => route.query.page,
  (value) => {
    if (value) {
      page.value = Number(value);
    } else {
      page.value = 1;
    }
    refresh();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
);

const {
  data: nowMovies,
  pending,
  error,
  refresh,
} = await useFetch<{ results: ApiMovie[] }>(
  () => `/api/movies?page=${page.value}`
);
</script>

<template>
  <div class="p-home">
    <Head>
      <Title>Films populaire</Title>
    </Head>
    <NuxtLayout name="default">
      <h1 v-if="pending">Chargement...</h1>
      <h1 v-else-if="error">Erreur: {{ error }}</h1>

      <div class="p-home__section">
        <h1 class="h2 mb-4">
          Films populaire<template v-if="page > 1"> (page {{ page }})</template>
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
