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
    console.error(error);
    if (error.response?.status === 500) {
      throw new Error('Não foi possível conectar ao banco de dados. Por favor, tente novamente mais tarde.');
    } else {
      const errorMessage = error.response?.data?.message || 'Login falhou';
      throw new Error(errorMessage);
    }
  }
}

export async function handleLogout() {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Token de refresh não encontrado');
    }

    const response = await api.post('auth/sign-out', { refreshToken });
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Falha ao sair');
  }
}
