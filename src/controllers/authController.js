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
    console.error("Erro ao fazer login:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Login falhou");
  }
}

// Função para lidar com o logout
export async function handleLogout(navigation) {
  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    console.log("Refresh Token:", refreshToken); // Depuração

    if (!refreshToken) {
      throw new Error("Refresh token não encontrado. Por favor, faça login novamente.");
    }

    // Faz a requisição para a rota de logout enviando o refreshToken
    const response = await api.post("/auth/sign-out", { refreshToken });

    // Verifica o status da resposta
    if (response.status !== 200) {
      throw new Error("Falha ao sair.");
    }

    // Limpa o armazenamento local após o logout
    await AsyncStorage.clear();

    // Redireciona para a tela de login
    if (navigation) {
      navigation.navigate("Auth");
    }

    return response.status;
  } catch (error) {
    console.error("Erro ao realizar logout:", error.response?.data || error.message);
    
    // Verifica se o erro é de token expirado
    if (error.response?.data?.message === "JWT expired") {
      Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
      await AsyncStorage.clear();
      if (navigation) {
        navigation.navigate("Auth");
      }
    }
    
    throw new Error(error.response?.data?.message || "Erro ao sair. Tente novamente.");
  }
}