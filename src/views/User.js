import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Avatar, Text, Button, Card, ActivityIndicator, IconButton } from 'react-native-paper';
import { fetchProducts } from '../controllers/productController';
import { handleLogout } from '../controllers/authController';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function User({ navigation }) {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true); // Define loading antes de buscar o usuário
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      setLoading(false); // Define loading como falso após carregar os dados do usuário
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
        Alert.alert('Erro', 'Não foi possível carregar os produtos.');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const handleLogoutPress = async () => {
    try {
      await handleLogout(navigation);
      setUser(null); // Limpa o estado do usuário
      navigation.navigate('Auth'); // Redireciona para a tela de autenticação
    } catch (error) {
      Alert.alert('Erro ao sair', error.message);
    }
  };

  const renderProduct = ({ item }) => (
    <Card style={styles.productItem} onPress={() => navigation.navigate('ProductDetails', { item })}>
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.userInfo}>
          <View style={styles.header}>
            <Avatar.Image
              size={60}
              source={
                !imageError && user.image
                  ? { uri: user.image }
                  : { uri: 'https://example.com/default-avatar.png' }
              }
              onError={() => setImageError(true)}
              style={styles.userImage}
            />
            <View style={styles.userDetails}>
              <Text variant="headlineSmall" style={styles.welcomeText}>
                Bem-vindo, {user.firstName}!
              </Text>
              <Button
                mode="outlined"
                onPress={handleLogoutPress}
                style={styles.logoutButton}
                labelStyle={{ color: '#E53935' }}
                compact
              >
                Sair
              </Button>
            </View>
          </View>
        </View>
      )}

      {loading ? (
        <ActivityIndicator animating={true} size="large" style={styles.loadingIndicator} />
      ) : products.length === 0 ? (
        <Text style={styles.emptyList}>Nenhum produto encontrado.</Text>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
        />
      )}

      <IconButton
        icon="plus"
        size={30}
        color="#fff"
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Product')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userImage: {
    backgroundColor: '#4169e1',
  },
  userDetails: {
    marginLeft: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  productItem: {
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  productList: {
    paddingBottom: 100,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#d2d2d2',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  logoutButton: {
    marginLeft: 5,
    borderColor: '#E53935',
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  emptyList: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#777',
  },
});
