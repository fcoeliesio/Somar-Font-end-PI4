import { api } from '../config/api';

export const signup = async (firstName, lastName, email, password) => {
  try {
    const response = await api.post('auth/sign-up', {
      firstName,
      lastName,
      email,
      password,
    });

    return response.data; // Supondo que o backend retorne um objeto com "success"
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message };
  }
};
