import axios from 'axios'


const isProd = window.location.origin.includes('heroku')
const accessToken = localStorage.getItem('accessToken')
const baseURL = isProd ? 'http://159.223.30.179' : 'http://localhost:1080'

const axiosInstance = axios.create({baseURL})

if (accessToken) {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${ accessToken }`
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

export default axiosInstance
