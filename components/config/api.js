import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'https://pi-4-back-end.onrender.com/api/v1',
  timeout: 30000, 
});

export const setAuthHeader = async () => {
  try {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      throw new Error('Token não encontrado. Por favor, faça login novamente.');
    }
  } catch (error) {
    console.error('Erro ao setar o token de autenticação:', error.message);
  }
};

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);