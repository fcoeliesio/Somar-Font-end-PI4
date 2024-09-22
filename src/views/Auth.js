import React, { useState, useReducer } from "react";
import { View, Text, Alert, StyleSheet, Image, TouchableOpacity } from "react-native";
import { TextInput, Button } from "react-native-paper"; 
import { userReducer, initialState } from "../models/userModel";
import { handleLogin } from "../controllers/authController";

export default function Auth({ navigation }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const tokens = await handleLogin(state.email, state.password);
      if (tokens && tokens.accessToken) {
        dispatch({ type: "SET_TOKENS", payload: tokens });
        setLoading(false);
        navigation.navigate("User", { email: state.email });
      } else {
        throw new Error("Tokens inválidos recebidos");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", error.message || "Falha ao fazer login");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../../assets/logo.png")}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <Image source={require("../../assets/mail.png")} resizeMode="contain" />
        <TextInput
          label="Digite seu e-mail"
          mode="outlined"
          onChangeText={(text) =>
            dispatch({ type: "SET_EMAIL", payload: text })
          }
          value={state.email}
          style={styles.input}
          theme={{ colors: { primary: "#007BFF" } }}
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require("../../assets/lock.png")} resizeMode="contain" />
        <TextInput
          label="Digite sua senha"
          mode="outlined"
          onChangeText={(text) =>
            dispatch({ type: "SET_PASSWORD", payload: text })
          }
          value={state.password}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: "#007BFF" } }}
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <Button
        mode="contained"
        onPress={login}
        loading={loading}
        style={styles.button}
        labelStyle={styles.buttonTitle}
        contentStyle={{ height: 50 }}
      >
        Entrar
      </Button>
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 64,
    gap: 32,
    paddingHorizontal: 20,
  },
  logo: {
    width: 127,
    height: 108,
    marginBottom: 32,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    width: '100%',
    marginTop: 16,
    justifyContent: "center",
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
  },
  registerText: {
    color: "#007BFF",
    textDecorationLine: "underline",
    fontSize: 16,
  },
});
