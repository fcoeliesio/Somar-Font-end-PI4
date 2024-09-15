import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importa useRoute
import { setAuthHeader, api } from '../config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function User() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute(); // Obtém a rota atual

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (userData && accessToken) {
          setUser(JSON.parse(userData));
          setToken(accessToken);
          setAuthHeader(accessToken); // Seta o token no header da API
          fetchProducts(); // Carrega a lista de produtos
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar os dados do usuário.');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await api.get('products'); // Supondo que você tenha uma rota para listar produtos
        setProducts(response.data); // Atualiza a lista de produtos
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      setUser(null);
      setToken(null); // Limpa o token do estado
      navigation.navigate('Login'); // Redireciona para a tela de login
    } catch (error) {
      Alert.alert('Erro', 'Falha ao fazer logout.');
    }
  };

  const handleNavigateToProduct = () => {
    // Verifica se o token está presente antes de navegar
    if (token) {
      navigation.navigate('Product', { token }); // Passa o token para a tela de cadastro de produto
    } else {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
    }
  };

  // Obtém o e-mail dos parâmetros da rota
  const { email } = route.params || {};

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>
            Bem-vindo {email ? `, ${email}` : ''}!
          </Text>

          {loading ? (
            <Text>Carregando produtos...</Text>
          ) : products.length > 0 ? (
            <FlatList
              data={products}
              keyExtractor={(item) => item.uuid}
              renderItem={({ item }) => (
                <View style={styles.product}>
                  <Text>{item.name}</Text>
                  <Text>{item.sellingPrice}</Text>
                </View>
              )}
            />
          ) : (
            <Text>Nenhum produto cadastrado.</Text>
          )}

          {/* Botão para cadastrar produto */}
          <Button title="Cadastrar Produto" onPress={handleNavigateToProduct} />

          <Button title="Logout" onPress={handleLogout} color="red" />
        </>
      ) : (
        <Text>Carregando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  product: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
