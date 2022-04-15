<script lang="ts" setup>
const { data: nowMovies } = await useFetch("/api/movies");
</script>

<template>
  <NuxtLayout name="default">
    <h1>Home !</h1>
    <pre>{{ nowMovies }}</pre>
  </NuxtLayout>
</template>
