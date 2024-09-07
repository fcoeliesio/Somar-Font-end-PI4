import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { handleRegister } from '../controllers/registerController';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    setLoading(true);
    try {
      await handleRegister({
        email,
        password,
        firstName,
        lastName,
      });
      setLoading(false);
      Alert.alert('Sucesso', 'Registro realizado com sucesso!');
      navigation.navigate('Auth');
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro', error.message || 'Falha ao registrar');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <Input
          onChangeText={setFirstName}
          placeholder="Digite seu nome"
          value={firstName}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.input}
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={setLastName}
          placeholder="Digite seu sobrenome"
          value={lastName}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.input}
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={setEmail}
          placeholder="Digite seu e-mail"
          value={email}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.input}
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={setPassword}
          placeholder="Digite sua senha"
          secureTextEntry
          value={password}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.input}
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={setConfirmPassword}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmPassword}
          inputContainerStyle={styles.inputContainerStyle}
          inputStyle={styles.input}
          placeholderTextColor="#A6A6A6"
        />
      </View>
      <Button
        title="Registrar"
        onPress={register}
        loading={loading}
        buttonStyle={styles.button}
        titleStyle={styles.buttonTitle}
        containerStyle={styles.buttonContainer}
        loadingProps={{ color: '#FFFFFF' }}
      />
      <TouchableOpacity
        style={styles.loginLink}
        onPress={() => navigation.navigate('Auth')}
      >
        <Text style={styles.loginText}>Já tem uma conta? Faça login</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        {/* Footer para receber outras informações no futuro */}
      </View>
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
    width: 127,
    height: 108,
    marginBottom: 16,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 8,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
  },
  input: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 12,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
  loginLink: {
    marginTop: 16,
  },
  loginText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontSize: 16,
    paddingHorizontal: 8,
  },
  footer: {
    marginTop: 32,
  },
});
