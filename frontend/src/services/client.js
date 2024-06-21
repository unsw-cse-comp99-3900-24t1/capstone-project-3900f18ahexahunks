import axios from 'axios';
// import Cookies from 'js-cookie';

// Creates an Axios instance configured with base settings.
const apiClient = axios.create({
  baseURL: 'http://localhost:5003', // Base URL for all requests.
  timeout: 10000, // Request timeout set to 1000 milliseconds.
  withCredentials: true, // Ensure cookies are sent with requests.
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Axios interceptor error:', error);
    return Promise.reject(error);
  }
);

// Adds a request interceptor to include a bearer token in each request's headers.
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get('token');

//     if (token) {
//       try {
//         config.headers.Authorization = `Bearer ${token}`;
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     return config;
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

export default apiClient;
