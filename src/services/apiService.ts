import axios, {type AxiosInstance} from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://localhost:7229/api/',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Add a request interceptor
// apiClient.interceptors.request.use((config) => {
//   // e.g., add auth token
//   const token = localStorage.getItem('user-token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default apiClient;
