import { api } from '../config/api';

export async function handleRegister({ email, password, firstName, lastName }) {
  try {
    const response = await api.post('auth/sign-up', {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 500) {
      throw new Error('Não foi possível conectar ao banco de dados. Tente novamente mais tarde.');
    } else {
      const errorMessage = error.response?.data?.message || 'Falha ao registrar';
      throw new Error(errorMessage);
    }
  }
}
