import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { createProduct } from '../controllers/productController';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

export default function Product({ navigation }) {
  const route = useRoute();
  const { token } = route.params || {}; // Obtém o token da rota

  const [product, setProduct] = useState({
    name: '',
    image: '',
    sellingPrice: '',
    buyingPrice: '',
    damaged: false,
  });

  const [batch, setBatch] = useState({
    barcode: '',
    amount: '',
    damaged: false,
  });

  const handleRegisterProduct = async () => {
    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await createProduct(product, batch, token); // Passa o token para a função do controller
      Alert.alert('Sucesso', response.message);
      navigation.goBack(); // Retorna à tela anterior após o cadastro
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput
        style={styles.input}
        value={product.name}
        onChangeText={(text) => setProduct({ ...product, name: text })}
        placeholder="Nome"
      />

      <Text style={styles.label}>Imagem:</Text>
      <TextInput
        style={styles.input}
        value={product.image}
        onChangeText={(text) => setProduct({ ...product, image: text })}
        placeholder="URL da Imagem"
      />

      <Text style={styles.label}>Preço de Venda:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={product.sellingPrice}
        onChangeText={(text) => setProduct({ ...product, sellingPrice: text })}
        placeholder="Preço de Venda"
      />

      <Text style={styles.label}>Preço de Compra:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={product.buyingPrice}
        onChangeText={(text) => setProduct({ ...product, buyingPrice: text })}
        placeholder="Preço de Compra"
      />

      <Text style={styles.label}>Código de Barras (Batch):</Text>
      <TextInput
        style={styles.input}
        value={batch.barcode}
        onChangeText={(text) => setBatch({ ...batch, barcode: text })}
        placeholder="Código de Barras"
      />

      <Text style={styles.label}>Quantidade (Batch):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={batch.amount}
        onChangeText={(text) => setBatch({ ...batch, amount: text })}
        placeholder="Quantidade"
      />

      <Button title="Cadastrar Produto" onPress={handleRegisterProduct} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
