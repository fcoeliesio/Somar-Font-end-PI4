import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from '@rneui/themed';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#0386D0',
    borderRadius: 8,
  },
});
