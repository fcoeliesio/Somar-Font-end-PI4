import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { fetchProducts } from '../controllers/productController'; // Função para buscar os produtos

export default function User({ route, navigation }) {
  const { email } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const response = await fetchProducts(); // Função que busca os produtos da API
        setProducts(response || []);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bem-vindo, {email}!</Text>
      
      <Button 
        title="Adicionar Produto"
        onPress={() => navigation.navigate('Product')}
      />

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 18,
    marginBottom: 10,
  },
  productItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
