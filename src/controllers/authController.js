// src/controllers/authController.js

import { api } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para lidar com o login
export async function handleLogin(email, password) {
  try {
    const response = await api.post("auth/sign-in", {
      email,
      password,
    });

    const { accessToken, refreshToken, user } = response.data;
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Armazena os dados do usuário

    return response.data; // { accessToken, refreshToken, user }
  } catch (error) {
    console.error(
      "Erro ao fazer login:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Login falhou");
  }
}

// Função para lidar com o logout
export async function handleLogout() {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error(
        "Refresh token não encontrado. Por favor, faça login novamente."
      );
    }

    // Faz a requisição para a rota de logout enviando o refreshToken
    const response = await api.post("/auth/sign-out", { refreshToken });

    // Limpa o armazenamento local após o logout
    await AsyncStorage.clear();

    // Redireciona para a tela de login
    return response.status;
  } catch (error) {
    console.error(
      "Erro ao realizar logout:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Erro ao sair. Tente novamente."
    );
  }
}
