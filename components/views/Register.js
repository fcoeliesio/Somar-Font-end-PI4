import React, { useState, useReducer } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Input, Button, Avatar } from '@rneui/themed';
import { launchImageLibrary } from 'react-native-image-picker';
import { signup } from '../controllers/registerController';
import { userReducer, initialState } from '../models/userModel'; // Importa o modelo de usuário

export default function Register({ navigation }) {
  const [state, dispatch] = useReducer(userReducer, initialState); // Usa o userReducer para gerenciar o estado
  const [Confirmar, setConfirmar] = useState(''); // Estado separado para confirmar senha
  const [Foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets) {
        setFoto(response.assets[0].uri);
      }
    });
  };

  const handleRegister = async () => {
    if (state.password !== Confirmar) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const userData = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
      };

      const response = await signup(userData); // Chama a função signup do controller
      if (response && response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Auth'); // Redireciona para a tela de Login
      } else {
        throw new Error('Erro ao registrar. Verifique os dados.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarContainer}>
          <Avatar
            size={100}
            rounded
            containerStyle={styles.avatar}
            source={Foto ? { uri: Foto } : null}
            icon={{ name: 'photo-library', type: 'material' }}
          >
            <Avatar.Accessory size={24} />
          </Avatar>
        </TouchableOpacity>
        <Text style={styles.headerTextAvatar}>Foto</Text>
        <View style={styles.body}>
          <Text style={styles.label}>Nome:</Text>
          <Input
            onChangeText={(text) => dispatch({ type: 'SET_FIRST_NAME', payload: text })}
            placeholder="Digite seu Nome"
            value={state.firstName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Text style={styles.label}>Sobrenome:</Text>
          <Input
            onChangeText={(text) => dispatch({ type: 'SET_LAST_NAME', payload: text })}
            placeholder="Digite seu Sobrenome"
            value={state.lastName}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Text style={styles.label}>Email:</Text>
          <Input
            onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
            placeholder="Digite seu Email"
            value={state.email}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Text style={styles.label}>Senha:</Text>
          <Input
            onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
            placeholder="Digite sua Senha"
            secureTextEntry
            value={state.password}
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Text style={styles.label}>Confirmar Senha:</Text>
          <Input
            onChangeText={setConfirmar}
            placeholder="Digite sua Senha"
            secureTextEntry
            containerStyle={styles.inputContainer}
            inputStyle={styles.input}
          />
          <Button
            title={loading ? 'Carregando...' : 'Registrar'}
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            onPress={handleRegister}
            disabled={loading}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignSelf: 'center',
    marginTop: 20,
  },
  avatar: {
    backgroundColor: '#4169e1',
  },
  headerTextAvatar: {
    textAlign: 'center',
    fontSize: 15,
    color: '#333',
  },
  body: {
    flex: 10,
    width: '100%',
    padding: 20,
  },
  label: {
    fontSize: 15,
    color: '#333',
    paddingLeft: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 15,
    padding: 10,
  },
  button: {
    width: 100,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
});
