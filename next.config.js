const movie_api = process.env.movie_API;

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org'],
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    return [
      {
        source: '/api/movies',
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${movie_api}`
      },
      {
        source: '/api/movie/:id',
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${movie_api}`
      }
    ]
  },
  trailingSlash: true
}
