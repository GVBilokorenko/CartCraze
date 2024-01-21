import axios from 'axios';

const axiosApiInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosApiInstance.interceptors.request.use(
  async config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json' // Updated to 'application/json'
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

axiosApiInstance.interceptors.response.use((response) => {
  return response;
}, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      console.log('getting token');
      const res = await axios.post('http://localhost:5000/api/users/token', { refreshToken });
      if (res.status === 200) {
        localStorage.setItem('accessToken', res.data.accessToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
        return axiosApiInstance(originalRequest);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
});

export default axiosApiInstance;
