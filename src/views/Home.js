import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper'; // Importa componentes do react-native-paper

export default function Home({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
        resizeMode="contain"
      />
      <Text style={styles.title}>Bem-vindo ao Somar Mencantil</Text>
      <Text style={styles.subtitle}>Sua solução completa na palma da mão</Text>

      <Button
        mode="contained" // Usando o modo "contained" para botões sólidos
        style={styles.button} 
        onPress={() => navigation.navigate('Auth')}
      >
        Ir para Login
      </Button>

      {/* Exemplo de campos de texto fictícios para uso futuro */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    fontSize: 16,
    width: '80%',
    marginBottom: 16,
    backgroundColor: '#ffffff', // O background deve ser branco para TextInput do Paper
  },
  buttonContainer: {
    width: '80%',
    paddingBottom: 18,
  },
  button: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 8,
  },
});

