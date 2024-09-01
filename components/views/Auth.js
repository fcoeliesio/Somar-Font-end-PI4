import React, { useState, useReducer } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { userReducer, initialState } from '../models/userModel';
import { handleLogin } from '../controllers/authController';

export default function Auth({ navigation }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      // Tentando autenticar com as credenciais fornecidas
      console.log('Tentando autenticar com:', state.email, state.password);
      
      const tokens = await handleLogin(state.email, state.password);
      
      // Verificando se os tokens foram recebidos
      console.log('Tokens recebidos:', tokens);

      if (tokens && tokens.accessToken) {
        dispatch({ type: 'SET_TOKENS', payload: tokens });
        setLoading(false);
        navigation.navigate('User', { email: state.email });
      } else {
        throw new Error('Tokens inválidos recebidos');
      }
    } catch (error) {
      setLoading(false);
      console.log('Erro durante o login:', error.message);
      Alert.alert('Erro', error.message || 'Falha ao fazer login');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Usuário</Text>
      <Input
        onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
        placeholder="Digite seu e-mail"
        value={state.email}
      />
      <Text>Senha</Text>
      <Input
        onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
        placeholder="Digite sua senha"
        secureTextEntry
        value={state.password}
      />
      <Button
        title="Autenticar"
        onPress={login}
        loading={loading}
      />
      {loading && <ActivityIndicator animating={loading} size="large" />}
    </View>
  );
}
