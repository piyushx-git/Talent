import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Log the full error response details
      console.error('Response error details:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        message: error.response.data?.message,
        errors: error.response.data?.errors
      });

      // Log the raw response for debugging
      console.error('Raw response:', error.response);
      
      // If there are validation errors, format them nicely
      if (error.response.data?.errors) {
        console.error('Validation errors:', error.response.data.errors);
      }
      
      // Return a more user-friendly error message
      const errorMessage = error.response.data?.message || 
                         error.response.data?.errors?.join(', ') || 
                         'An error occurred';
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      console.error('Request error:', error.request);
      return Promise.reject(new Error('No response from server. Please check your connection.'));
    } else {
      console.error('Error:', error.message);
      return Promise.reject(new Error('An unexpected error occurred.'));
    }
  }
);

export default api; 