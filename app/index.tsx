import React from "react";
import { Text, View, StyleSheet, ScrollView, StatusBar } from "react-native";
import TextField from "@/components/TextField";
import "../global.css";
import { Stack } from "expo-router";

export default function Index() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />

      {/* Fondo y título */}
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Hola profeee</Text>
        <Text style={styles.subtitle}>Crea tu cuenta (deme una moneditaaa)</Text>

        {/* Formulario */}
        <View style={styles.formWrapper}>
          <TextField />
        </View>
      </ScrollView>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A", // Fondo oscuro elegante
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4B9EFF", // Azul suave para resaltar
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#AAA",
    marginBottom: 40,
    textAlign: "center",
  },
  formWrapper: {
    width: "100%",
    backgroundColor: "#151515",
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    shadowColor: "#4B9EFF",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
});
