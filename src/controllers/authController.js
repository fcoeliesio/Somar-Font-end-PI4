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

    if (!refreshToken) {
      throw new Error("Refresh token não encontrado. Por favor, faça login novamente.");
    }

    const response = await api.post("/auth/sign-out", { refreshToken });
    
    if (response.status !== 204) {
      throw new Error("Falha ao sair.");
    }

    // Limpa o AsyncStorage
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("user");
    
    // Redireciona para a tela de login
    if (navigation) {
      console.log("Navegando para a tela de login");
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }
  } catch (error) {
    console.error("Erro ao realizar logout:", error.message);

    if (error.response) {
      console.error("Dados do erro:", error.response.data);
      if (error.response.data.message === "JWT expired") {
        Alert.alert("Sessão expirada", "Por favor, faça login novamente.");
        await AsyncStorage.clear(); // Limpa tudo em caso de sessão expirada
        if (navigation) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
        }
      }
    } else {
      Alert.alert('Erro ao sair', error.message);
    }
  }
}