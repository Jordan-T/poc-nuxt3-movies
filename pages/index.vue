<script lang="ts" setup>
const {
  data: nowMovies,
  pending,
  error,
} = await useFetch<{ results: ApiMovie[] }>("/api/movies");
</script>

<template>
  <div>
    <NuxtLayout class="p-home" name="default">
      <h1 v-if="pending">Chargement...</h1>
      <h1 v-else-if="error">Erreur: {{ error }}</h1>

      <div class="p-home__section">
        <h1 class="h2 mb-4">Actuellement au cinéma</h1>
        <div v-if="nowMovies" class="p-home__list">
          <MovieCard
            v-for="movie in nowMovies.results"
            :movie="movie"
            :key="movie.title"
          />
        </div>
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
