// src/controllers/authController.js

import { api } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function handleLogin(email, password) {
  try {
    const response = await api.post('auth/sign-in', {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    console.error('Erro ao fazer login:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login falhou');
  }
}

export async function refreshAccessToken() {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Token de refresh não encontrado');
    }

    const response = await api.post('auth/refresh', { refreshToken });
    const { accessToken } = response.data;

    await AsyncStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Refresh Token Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Falha ao atualizar o token de acesso');
  }
}

export async function handleLogout() {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Token de refresh não encontrado');
    }

    await api.post('auth/sign-out', { refreshToken });
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
  } catch (error) {
    console.error('Logout Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Falha ao sair');
  }
}
