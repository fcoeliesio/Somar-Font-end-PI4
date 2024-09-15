import React, { useState, useReducer } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
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
        <Input
          onChangeText={(text) =>
            dispatch({ type: "SET_EMAIL", payload: text })
          }
          placeholder="Digite seu e-mail"
          value={state.email}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.input}
          placeholderTextColor="#A6A6A6"
          leftIconContainerStyle={styles.iconContainer}
          containerStyle={styles.inputFieldContainer}
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
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.input}
          placeholderTextColor="#A6A6A6"
          leftIconContainerStyle={styles.iconContainer}
          containerStyle={styles.inputFieldContainer}
        />
      </View>
      <Button
        title="Entrar"
        onPress={login}
        loading={loading}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        containerStyle={styles.buttonContainer}
        loadingProps={{ color: '#FFFFFF' }}
      />
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
  inputFieldContainer: {
    flex: 1,
    marginLeft: 8,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D1D1",
  },
  input: {
    fontSize: 16,
    color: "#333333",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  iconContainer: {
    marginRight: 8,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 16,
    width: '100%',
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
