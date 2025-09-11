import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TextInput, Button, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import BuyerCard from "./components/BuyerCard";
import KrishiKendraCard from "./components/KrishiKendraCard";

const API_BASE = "http://localhost:4000/api"; // Change to your backend IP if testing on device

export default function App() {
  const [cropType, setCropType] = useState("");
  const [location, setLocation] = useState("");
  const [buyers, setBuyers] = useState([]);
  const [kendras, setKendras] = useState([]);
  const [diseaseResult, setDiseaseResult] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  // Fetch buyers
  const fetchBuyers = async () => {
    try {
      const res = await fetch(`${API_BASE}/buyers?crop=${cropType}&location=${location}`);
      const data = await res.json();
      setBuyers(data);
    } catch (e) {
      Alert.alert("Error", "Failed to fetch buyers");
    }
  };

  // Fetch kendras
  const fetchKendras = async () => {
    try {
      const res = await fetch(`${API_BASE}/kendras`);
      const data = await res.json();
      setKendras(data);
    } catch (e) {
      Alert.alert("Error", "Failed to fetch Krishi Kendras");
    }
  };

  useEffect(() => {
    fetchKendras();
  }, []);

  // Mock disease detection
  const detectDisease = async () => {
    if (!cropType || !location || !imageUri) {
      Alert.alert("Error", "Please fill all fields and upload image");
      return;
    }
    try {
      // In real app, send image to backend
      const res = await fetch(`${API_BASE}/disease-detection`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cropType, location })
      });
      const data = await res.json();
      setDiseaseResult(data);
    } catch (e) {
      Alert.alert("Error", "Disease detection failed");
    }
  };

  // Image picker (Expo)
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Allow access to photos");
        return;
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1
      });
      if (!result.cancelled) {
        setImageUri(result.uri);
        setDiseaseResult(null);
      }
    } catch (e) {
      Alert.alert("Error", "Image picking failed");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Krishi Saathi Mobile App</Text>

      {/* Marketplace */}
      <Text style={styles.sectionTitle}>Marketplace</Text>
      <TextInput placeholder="Crop Type" value={cropType} onChangeText={setCropType} style={styles.input} />
      <TextInput placeholder="Location" value={location} onChangeText={setLocation} style={styles.input} />
      <Button title="Find Buyers" onPress={fetchBuyers} disabled={!cropType || !location} />
      {buyers.map((b, i) => <BuyerCard key={i} buyer={b} />)}

      {/* Disease Detection */}
      <Text style={styles.sectionTitle}>Disease Detection</Text>
      <Button title="Pick Crop Image" onPress={pickImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <Button title="Analyze Disease" onPress={detectDisease} disabled={!cropType || !location || !imageUri} />
      {diseaseResult && (
        <View style={styles.card}>
          <Text>Disease: {diseaseResult.disease}</Text>
          <Text>Confidence: {diseaseResult.confidence}</Text>
          <Text>Description: {diseaseResult.description}</Text>
          <Text>Remedies:</Text>
          {diseaseResult.remedies.map((r, i) => <Text key={i}>- {r}</Text>)}
          <Text>Preventive Measures:</Text>
          {diseaseResult.preventive.map((p, i) => <Text key={i}>- {p}</Text>)}
          <Text>Nearest Krishi Kendra: {diseaseResult.krishiKendra.name}</Text>
          <Text>Phone: {diseaseResult.krishiKendra.phone}</Text>
        </View>
      )}

      {/* Local Resources */}
      <Text style={styles.sectionTitle}>Local Resources</Text>
      {kendras.map((k, i) => <KrishiKendraCard key={i} kendra={k} />)}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#e6f2e6" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16, color: "#2e7d32" },
  sectionTitle: { fontSize: 20, fontWeight: "600", marginTop: 24, marginBottom: 8, color: "#1b5e20" },
  input: { borderWidth: 1, borderColor: "#2e7d32", borderRadius: 4, padding: 8, marginBottom: 12, backgroundColor: "white" },
  card: { backgroundColor: "white", padding: 12, borderRadius: 8, marginVertical: 8 },
  image: { width: "100%", height: 200, marginVertical: 12, borderRadius: 8 }
});