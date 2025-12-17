import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' || 'https://url-shortner-jscr.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

const initialToken = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (initialToken) {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
}

// Keep track of interceptor IDs so we can eject if needed
let requestInterceptorId: number;
let responseInterceptorId: number;

export const setupAxiosInterceptors = (getToken: () => string | null) => {
  // Eject old interceptors if they exist
  if (requestInterceptorId !== undefined) {
    axiosInstance.interceptors.request.eject(requestInterceptorId);
  }
  if (responseInterceptorId !== undefined) {
    axiosInstance.interceptors.response.eject(responseInterceptorId);
  }

  // Request interceptor
//   requestInterceptorId = axiosInstance.interceptors.request.use(
//     (config) => {
//       const token = getToken();
//       if (token) {
//         config.headers = {
//           ...config.headers,
//           Authorization: `Bearer ${token}`,
//         };
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
requestInterceptorId = axiosInstance.interceptors.request.use(
  (config) => {
   
    const token = getToken() || localStorage.getItem('token');
    // Attach token if available
    if (token) {
      config.headers = config.headers ?? {};
      if ('set' in config.headers) {
        config.headers.set('Authorization', `Bearer ${token}`);
      } else {
        (config.headers as any)['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


  // Response interceptor
  responseInterceptorId = axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong!';

      if (status === 401) toast.error('Unauthorized: Please log in again.');
      else if (status === 403) toast.error('Access Denied.');
      else if (status === 404) toast.error('Resource not found.');
      else if (status >= 500) toast.error('Server error, please try again later.');
      else toast.error(message);

      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
