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
  env: {
    mysql_host :'localhost',
    mysql_port :3306,
    mysql_database :'backmovie',
    mysql_user :'backtest',
    mysql_password :'backtest!@12', 
  },
  trailingSlash: true
}
