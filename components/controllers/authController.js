import { api } from '../config/api';

export async function handleLogin(email, password) {
  try {
    const response = await api.post('auth/sign-in', {
      email,
      password,
    });
    return response.data; // { accessToken, refreshToken }
  } catch (error) {
    console.error(error); // Adicione isso para ver o erro completo
    if (error.response?.status === 500) {
      throw new Error('Não foi possível conectar ao banco de dados. Por favor, tente novamente mais tarde.');
    } else {
      const errorMessage = error.response?.data?.message || 'Login falhou';
      throw new Error(errorMessage);
    }
  }
}

export async function handleLogout(refreshToken) {
  try {
    const response = await api.post('auth/sign-out', { refreshToken });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Falha ao sair');
  }
}