import React from "react";
import { View, Text, Button, StyleSheet, Linking } from "react-native";

export default function KrishiKendraCard({ kendra }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{kendra.name}</Text>
      <Text>Distance: {kendra.distance}</Text>
      <Text>Services: {kendra.services.join(", ")}</Text>
      <Button title="Call Now" onPress={() => Linking.openURL(`tel:${kendra.phone}`)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginVertical: 8
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#1b5e20"
  }
});