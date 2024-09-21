import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "./components/Header";

export default function Inventory({ navigation }) {
  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Text>{item.name}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        ListEmptyComponent={
          <Text style={styles.emptyList}>Nenhum produto encontrado</Text>
        }
      /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  emptyList: {
    textAlign: "center",
    marginTop: 32,
  },
});
