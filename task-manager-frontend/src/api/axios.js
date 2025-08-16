import axios from 'axios';
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Attach token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('tm_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Central error logging (optionally show toasts)
instance.interceptors.response.use(
  (r) => r,
  (err) => {
    // You can inspect err.response?.data for messages
    return Promise.reject(err);
  }
);

export default instance;