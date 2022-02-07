import axios from 'axios'

const isProd = window.location.origin.includes('heroku')
let axiosInstance = axios.create({
  baseURL: isProd ? window.location.origin : 'http://localhost:1080',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),
);

export default axiosInstance;
