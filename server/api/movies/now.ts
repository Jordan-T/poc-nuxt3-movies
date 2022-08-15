export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.tmdbKey;
  const query = useQuery(event);
  const page = query.page || 1;
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=fr-FR&page=${page}`
  ).then<{ results: ApiMovie[] }>((r) => r.json());
});
