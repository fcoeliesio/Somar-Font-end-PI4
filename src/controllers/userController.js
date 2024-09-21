import { api } from '../config/api';

export async function fetchUserDetails() {
  try {
    const response = await api.get('user/details');
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to fetch user details';
    throw new Error(errorMessage);
  }
}

export async function updateUserProfile(userData) {
  try {
    const response = await api.put('user/update', userData);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to update user profile';
    throw new Error(errorMessage);
  }
}
