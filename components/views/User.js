import React, { useState } from 'react';
import { Text, View, Button, Alert, StyleSheet } from 'react-native';
import { handleLogout } from '../controllers/authController';
import { useNavigation } from '@react-navigation/native';

export default function User({ route }) {
  const { email, refreshToken } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await handleLogout(refreshToken);
      Alert.alert('Sucesso', 'Você foi desconectado com sucesso.');
      navigation.navigate('Auth'); // Redireciona para a tela de login
    } catch (error) {
      Alert.alert('Erro', error.message || 'Falha ao sair');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo, {email}!</Text>
      <Button title="Sair" onPress={logout} disabled={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
