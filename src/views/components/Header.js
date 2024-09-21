import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Avatar, TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import UserIcon from "./UserIcon";

export default function Header({ title }) {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <UserIcon />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3385B3",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    backgroundColor: "#fff",
  },
});
