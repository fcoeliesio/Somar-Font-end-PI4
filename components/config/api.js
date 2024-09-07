import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://pi-4-back-end.onrender.com/api/v1/',
  timeout: 30000, 
});


// Interceptor para capturar erros
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Erros que recebem resposta do servidor
      const errorMessage = error.response.data?.message || 'Algo deu errado';
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      // Erros de conexão ou timeout
      return Promise.reject(new Error('Sem resposta do servidor. Verifique sua conexão.'));
    } else {
      // Erros ao configurar a requisição
      return Promise.reject(new Error('Erro ao configurar a requisição.'));
    }
  }
);

export const setAuthHeader = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
