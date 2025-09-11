import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function BuyerCard({ buyer }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{buyer.name}</Text>
      <Text>Distance: {buyer.distance}</Text>
      <Text>Crops: {buyer.crop}</Text>
      <Text>Rating: {buyer.rating}</Text>
      <Button title="Contact" onPress={() => alert(`Contacting ${buyer.name}`)} />
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