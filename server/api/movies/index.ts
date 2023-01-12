export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.tmdbKey;
  const query = getQuery(event);
  const page = query.page || 1;
  const data = await $fetch<{ results: ApiMovie[] }>(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=fr-FR&page=${page}`
  );

  return data;
});
