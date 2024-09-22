import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Appbar, Text } from "react-native-paper";
import { createProduct } from "../controllers/productController";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Product({ navigation }) {
  const [token, setToken] = useState(null);
  const [product, setProduct] = useState({
    name: "",
    image: "",
    sellingPrice: "",
    buyingPrice: "",
    damaged: false,
  });

  const [batch, setBatch] = useState({
    barcode: "",
    amount: "",
    damaged: false,
  });

  useEffect(() => {
    async function loadToken() {
      const storedToken = await AsyncStorage.getItem("accessToken");
      if (storedToken) {
        setToken(storedToken);
      } else {
        Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
        navigation.jumpTo("Auth");
      }
    }

    loadToken();
  }, []);

  const handleRegisterProduct = async () => {
    if (!token) {
      Alert.alert("Erro", "Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      const response = await createProduct(product, batch, token);
      Alert.alert("Sucesso", response.message);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          label="Nome do Produto"
          value={product.name}
          onChangeText={(text) => setProduct({ ...product, name: text })}
          style={styles.input}
        />

        <TextInput
          label="Imagem"
          value={product.image}
          onChangeText={(text) => setProduct({ ...product, image: text })}
          style={styles.input}
          placeholder="URL da Imagem"
        />

        <TextInput
          label="Preço de Venda"
          keyboardType="numeric"
          value={product.sellingPrice}
          onChangeText={(text) => setProduct({ ...product, sellingPrice: text })}
          style={styles.input}
        />

        <TextInput
          label="Preço de Compra"
          keyboardType="numeric"
          value={product.buyingPrice}
          onChangeText={(text) => setProduct({ ...product, buyingPrice: text })}
          style={styles.input}
        />

        <TextInput
          label="Código de Barras (Batch)"
          value={batch.barcode}
          onChangeText={(text) => setBatch({ ...batch, barcode: text })}
          style={styles.input}
        />

        <TextInput
          label="Quantidade (Batch)"
          keyboardType="numeric"
          value={batch.amount}
          onChangeText={(text) => setBatch({ ...batch, amount: text })}
          style={styles.input}
        />

        <Button mode="contained" onPress={handleRegisterProduct} style={styles.button}>
          Cadastrar Produto
        </Button>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#1254a4",
    marginTop: 10,
  },
});
