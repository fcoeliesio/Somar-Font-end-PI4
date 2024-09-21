import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { fetchProducts } from '../controllers/productController';
import { handleLogout } from '../controllers/authController'; // Importa a função de logout
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Para os ícones dos botões

export default function User({ navigation }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Recupera os dados do usuário armazenados
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };
    loadUser();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const response = await fetchProducts();
        setProducts(response || []);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleLogoutPress = async () => {
    try {
      await handleLogout(navigation); // Usa a função de logout do authController
    } catch (error) {
      Alert.alert('Erro ao sair', error.message);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Barra do usuário */}
      {user && (
        <View style={styles.userInfo}>
          <View style={styles.header}>
            {!imageError && user.image && (
              <Image
                source={{ uri: user.image }} // Usa a imagem do usuário vinda do backend
                style={styles.userImage}
                onError={() => setImageError(true)} // Define que houve erro ao carregar a imagem
              />
            )}
            <Text style={styles.welcomeText}>Bem-vindo, {user.firstName}!</Text>
            {/* Botão de Logout */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
              <Icon name="logout" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {loading ? (
        <Text>Carregando produtos...</Text>
      ) : products.length === 0 ? (
        <Text>Nenhum produto encontrado.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      {/* Botão flutuante de adicionar produto */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Product')}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200EE',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  logoutButton: {
    backgroundColor: '#E53935',
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
