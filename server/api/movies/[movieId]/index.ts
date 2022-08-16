export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.tmdbKey;
  const movieId = event.context.params.movieId;

  // TODO add credits
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR&append_to_response=videos,recommendations,credits`
  ).then<ApiMovieDetail>((r) => r.json());
});
