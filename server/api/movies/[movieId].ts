const key = process.env.THE_MOVIE_DB_KEY || 'dummy-key';

export default defineEventHandler((event) => {
  const movieId = event.context.params.movieId
  
  return fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=fr-FR`).then(r => r.json())
})