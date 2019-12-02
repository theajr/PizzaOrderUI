import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://vast-castle-52132.herokuapp.com/api/auth',
  baseURL: 'http://localhost:8000/api/auth',
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

    var css = document.createElement('style');
    css.type = 'text/css';
    css.id = 'loader-css';

    var styles = 'body { cursor:wait; }';

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));
    document.getElementsByTagName('head')[0].appendChild(css);

    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function(response) {
    const loader = document.getElementById('loader-css');
    if (loader) {
      loader.remove();
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  },
);

export default instance;
