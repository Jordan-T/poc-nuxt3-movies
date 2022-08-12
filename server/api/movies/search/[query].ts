export default defineEventHandler((event) => {
  const runtimeConfig = useRuntimeConfig();
  const apiKey = runtimeConfig.tmdbKey;
  const query = event.context.params.query;

  //api.themoviedb.org/3/search/movie?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US&page=1&query=${this.searchInput}&include_adult=false
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${query}&page=1&api_key=${apiKey}&language=fr-FR`
  ).then((r) => r.json());
});
