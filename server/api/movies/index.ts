const runtimeConfig = useRuntimeConfig();
const key = runtimeConfig.tmdbKey;

export default defineEventHandler((event) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=fr-FR`
  ).then((r) => r.json());
});
