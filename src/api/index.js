import axios from 'axios';

import Config from 'react-native-config';

// const search = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=`;
// const poster = `https://image.tmdb.org/t/p/w400`;
// const trending = `https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`;
// const upcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}&language=en-US&page=1`;
// const toprated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}&language=en-US&page=1`;
// const detail = `https://api.themoviedb.org/3/movie/640344?api_key=${apikey}&language=en-US`;

export default axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: Config.API_KEY,
  },
});
