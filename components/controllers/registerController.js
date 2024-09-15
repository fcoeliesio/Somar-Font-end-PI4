import { api } from '../config/api';

export const signup = async (firstName, lastName, email, password) => {
  try {
    const response = await api.post('auth/sign-up', {
      firstName,
      lastName,
      email,
      password,
    });

    if (response.data && response.data.uuid) {
      return {
        success: true,
        data: response.data,
        message: 'Cadastro realizado com sucesso!',
      };
    } else {
      throw new Error('Dados de resposta inesperados');
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
