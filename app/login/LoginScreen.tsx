import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const savedUser = await AsyncStorage.getItem("user");
    if (!savedUser) {
      Alert.alert("Error", "No hay ningún usuario registrado.");
      return;
    }

    const userData = JSON.parse(savedUser);
    if (email === userData.email && password === userData.password) {
      Alert.alert("Bienvenido", `Hola, ${userData.name}!`);
      router.push("/home/HomeScreen");
    } else {
      Alert.alert("Error", "Correo o contraseña incorrectos.");
    }
  };

  return (
    <View className="flex-1 bg-[#0b0b0b] px-6 pt-20">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 bg-white/10 rounded-full p-3"
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Iniciar Sesión
      </Text>

      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999"
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#FA0501] py-4 rounded-full mt-4"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
