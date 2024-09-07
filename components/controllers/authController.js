import { api } from '../config/api';

export async function handleLogin(email, password) {
  try {
    const response = await api.post('auth/sign-in', {
      email,
      password,
    });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error('Não foi possível conectar ao banco de dados. Por favor, tente novamente mais tarde.');
    } else {
      const errorMessage = error.response?.data?.message || 'Login falhou';
      throw new Error(errorMessage);
    }
  }
}