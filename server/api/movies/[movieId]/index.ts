export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.tmdbKey;
  const movieId = event.context.params.movieId;

  // TODO add credits
  const data = await $fetch<ApiMovieDetail>(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=fr-FR&append_to_response=videos,recommendations,credits`
  );

  return data;
});
