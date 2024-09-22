import React, { useState, useReducer } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { TextInput, Button, Avatar } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import { signup } from '../controllers/registerController';
import { userReducer, initialState } from '../models/userModel';

export default function Register({ navigation }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [confirmar, setConfirmar] = useState('');
  const [foto, setFoto] = useState(null); // Estado para armazenar o link da foto.
  const [loading, setLoading] = useState(false);

  // URL padrão para a imagem de avatar.
  const defaultAvatarUrl = 'https://example.com/default-avatar.png'; // Substitua pelo link correto.

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets) {
        setFoto(response.assets[0].uri);
      }
    });
  };

  const handleRegister = async () => {
    console.log('Tentando registrar...');

    if (state.password !== confirmar) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const response = await signup(state.firstName, state.lastName, state.email, state.password);
      console.log('Resposta do signup:', response);

      if (response.success) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Auth');
      } else {
        throw new Error(response.message || 'Erro ao registrar.');
      }
    } catch (error) {
      console.log('Erro ao registrar:', error);
      Alert.alert('Erro', error.message || 'Erro ao realizar cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleChoosePhoto} style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={
              foto
                ? { uri: foto } // Exibir a foto selecionada se houver.
                : { uri: defaultAvatarUrl } // Usar a URL da imagem padrão caso não haja foto.
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.headerTextAvatar}>Foto</Text>
        <View style={styles.body}>
          <TextInput
            label="Nome"
            mode="outlined"
            value={state.firstName}
            onChangeText={(text) => dispatch({ type: 'SET_FIRST_NAME', payload: text })}
            style={styles.input}
          />
          <TextInput
            label="Sobrenome"
            mode="outlined"
            value={state.lastName}
            onChangeText={(text) => dispatch({ type: 'SET_LAST_NAME', payload: text })}
            style={styles.input}
          />
          <TextInput
            label="Email"
            mode="outlined"
            value={state.email}
            onChangeText={(text) => dispatch({ type: 'SET_EMAIL', payload: text })}
            style={styles.input}
          />
          <TextInput
            label="Senha"
            mode="outlined"
            secureTextEntry
            value={state.password}
            onChangeText={(text) => dispatch({ type: 'SET_PASSWORD', payload: text })}
            style={styles.input}
          />
          <TextInput
            label="Confirmar Senha"
            mode="outlined"
            secureTextEntry
            value={confirmar}
            onChangeText={setConfirmar}
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Carregando...' : 'Criar Cadastro'}
          </Button>
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
    flex: 1,
    width: '100%',
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1254a4",
    marginTop: 20,
  },
});
