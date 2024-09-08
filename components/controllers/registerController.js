import { api } from '../config/api';

export async function signup({ nome, sobrenome, email, password, foto }) {
  try {
    const response = await api.post('auth/sign-up', {
      nome,
      sobrenome,
      email,
      password,
      foto, // Inclui a foto se for necessário no backend
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
