export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.tmdbKey;
  const query = getQuery(event);
  const page = query.page || 1;
  const data = $fetch<{ results: ApiMovie[] }>(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&page=${page}`
  );

  return data;
});
