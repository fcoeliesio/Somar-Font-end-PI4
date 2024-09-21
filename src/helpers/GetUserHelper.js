export default async function getUserHelper() {
  try {
    const userData = await AsyncStorage.getItem("user");
    return JSON.parse(userData);
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error.message);
    return {
      firstName: "Usuário",
      email: "test@test.com",
      image: null,
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
  }
}
