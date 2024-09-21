import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Input } from '@rneui/themed';

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
        title="Ir para Login"
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('Auth')}
      />

      {/* Campos de texto fictícios para uso futuro */}
      <View style={styles.textFieldsContainer}>
        <Input
          placeholder="Campo de Texto 1"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          placeholder="Campo de Texto 2"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Input
          placeholder="Campo de Texto 3"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
      </View>

      
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
  textFieldsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  buttonContainer: {
    width: '80%',
    paddingBottom: 18,
  },
  button: {
    backgroundColor: '#0386D0',
    borderRadius: 8,
  },
});
