const runtimeConfig = useRuntimeConfig();
const key = runtimeConfig.tmdbKey;

export default defineEventHandler((event) => {
  const movieId = event.context.params.movieId;

  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=fr-FR&append_to_response=videos`
  ).then((r) => r.json());
});
