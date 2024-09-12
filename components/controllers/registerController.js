import { api } from '../config/api';

export async function signup(firstName, lastName, email, password) {
  try {
    const response = await api.post('auth/sign-up', {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    if (error.response?.status === 500) {
      throw new Error('Não foi possível conectar ao banco de dados. Tente novamente mais tarde.');
    } else {
      const errorMessage = error.response?.data?.message || 'Falha ao registrar';
      throw new Error(errorMessage);
    }
  }
}
