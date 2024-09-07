import React, { useState, useReducer } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { Input, Button } from "@rneui/themed";
import { userReducer, initialState } from "../models/userModel";
import { handleLogin } from "../controllers/authController";

export default function Auth({ navigation }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      console.log("Tentando autenticar com:", state.email, state.password);

      const tokens = await handleLogin(state.email, state.password);

      console.log("Tokens recebidos:", tokens);

      if (tokens && tokens.accessToken) {
        dispatch({ type: "SET_TOKENS", payload: tokens });
        setLoading(false);
        navigation.navigate("User", { email: state.email });
      } else {
        throw new Error("Tokens inválidos recebidos");
      }
    } catch (error) {
      setLoading(false);
      console.log("Erro durante o login:", error.message);
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
        <Input
          onChangeText={(text) =>
            dispatch({ type: "SET_EMAIL", payload: text })
          }
          placeholder="Digite seu e-mail"
          value={state.email}
          inputStyle={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Image source={require("../../assets/lock.png")} resizeMode="contain" />
        <Input
          onChangeText={(text) =>
            dispatch({ type: "SET_PASSWORD", payload: text })
          }
          placeholder="Digite sua senha"
          secureTextEntry
          value={state.password}
          inputStyle={styles.input}
        />
      </View>
      <Button title="Entrar" onPress={login} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#2F2F2F",
    alignSelf: "stretch",
    marginHorizontal: 32,
    marginVertical: 8,
    paddingBottom: 8,
    gap: 8,
  },
  input: {
    fontSize: 18,
    color: "#A6A6A6",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 64,
    gap: 32,
  },
  logo: {
    width: 127,
    height: 108,
  },
});
