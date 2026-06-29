import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Works because of Vite proxy
  withCredentials: true, // Crucial for sending cookies
});

// Response interceptor to handle 401s gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      const requestUrl = error.config?.url ?? '';
      const isSessionCheck = requestUrl.includes('/auth/me');
      const protectedPaths = ['/dashboard'];
      const onProtectedRoute = protectedPaths.some((p) =>
        window.location.pathname.startsWith(p)
      );
      if (!isSessionCheck && onProtectedRoute && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;