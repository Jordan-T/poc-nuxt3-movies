const key = process.env.THE_MOVIE_DB_KEY || 'dummy-key';

export default defineEventHandler((event) => {
  return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=fr-FR`).then(r => r.json())
})