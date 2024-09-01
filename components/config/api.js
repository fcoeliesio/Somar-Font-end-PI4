import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pi-4-back-end.onrender.com/api/v1/',
  timeout: 10000,
});

export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
