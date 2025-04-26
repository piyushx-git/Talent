import api from './axiosConfig';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const setAuthData = (token, user) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

export const checkAuth = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    clearAuthData();
    throw error;
  }
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  const { token, user } = response.data;
  setAuthData(token, user);
  return { token, user };
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  const { token, user } = response.data;
  setAuthData(token, user);
  return { token, user };
};

export const logoutUser = () => {
  clearAuthData();
}; 