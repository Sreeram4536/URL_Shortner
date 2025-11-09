// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Function to attach interceptors dynamically
// export const setupAxiosInterceptors = (getToken: () => string | null) => {
//   // Remove existing interceptors to avoid duplicates during re-renders
//   axiosInstance.interceptors.request.clear();
//   axiosInstance.interceptors.response.clear();

//   // Request interceptor
//   axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = getToken();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Response interceptor
//   axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       const status = error.response?.status;
//       if (status === 401) {
//         console.error('Unauthorized: please log in again');
//       } else if (status >= 500) {
//         console.error('Server error! Try again later.');
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// export default axiosInstance;

import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const setupAxiosInterceptors = (getToken: () => string | null) => {
  axiosInstance.interceptors.request.clear();
  axiosInstance.interceptors.response.clear();

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong!';

      // 🎯 Show toast notifications for errors
      if (status === 401) {
        toast.error('Unauthorized: Please log in again.');
      } else if (status === 403) {
        toast.error('Access Denied.');
      } else if (status === 404) {
        toast.error('Resource not found.');
      } else if (status >= 500) {
        toast.error('Server error, please try again later.');
      } else {
        toast.error(message);
      }

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
