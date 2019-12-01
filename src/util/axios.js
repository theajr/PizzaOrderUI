import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://vast-castle-52132.herokuapp.com/api/auth',
  // baseURL: 'http://localhost:8000/api/auth',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
instance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem('token');
    if (token && !config.url.endsWith('/login')) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default instance;
