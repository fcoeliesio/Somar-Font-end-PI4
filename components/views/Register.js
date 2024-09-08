import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button, Avatar, Icon } from '@rneui/themed';
import { launchImageLibrary } from 'react-native-image-picker';
import { signup } from '../controllers/registerController';

export default function Register({navigation}) {
  const [Nome, setNome] = useState('');
  const [Sobrenome, setSobrenome] = useState('');
  const [Email, setEmail] = useState('');
  const [Senha, setSenha] = useState('');
  const [Confirmar, setConfirmar] = useState('');
  const [Foto, setFoto] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets) {
        setFoto(response.assets[0].uri);
      }
    });
  };

  const handleRegister = async () => {
    // Verifica se as senhas coincidem
    if (Senha !== Confirmar) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      // Dados do usuário para serem enviados na API
      const userData = {
        nome: Nome,
        sobrenome: Sobrenome,
        email: Email,
        password: Senha,
        foto: Foto, // Você pode enviar a URL da foto se for relevante para o cadastro
      };

      // Chama a função de signup
      const response = await signup(userData);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');

      // Aqui você pode redirecionar o usuário ou limpar os campos
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao realizar cadastro.');
    }
  };


  return (
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
          onChangeText={setNome}
          placeholder="Digite seu Nome"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Text style={styles.label}>Sobrenome:</Text>
        <Input
          onChangeText={setSobrenome}
          placeholder="Digite seu Sobrenome"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Text style={styles.label}>Email:</Text>
        <Input
          onChangeText={setEmail}
          placeholder="Digite seu Email"
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
        />
        <Text style={styles.label}>Senha:</Text>
        <Input
          onChangeText={setSenha}
          placeholder="Digite sua Senha"
          secureTextEntry
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
          title="Registrar"
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.button}
          onPress={handleRegister} // Chama a função de registro ao clicar no botão
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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