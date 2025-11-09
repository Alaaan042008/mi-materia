import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirm) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    if (password !== confirm) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    const newUser = { name, email, password };
    await AsyncStorage.setItem("user", JSON.stringify(newUser));

    Alert.alert("Éxito", "Registro completado. Ahora puedes iniciar sesión.");
    router.push("/login/LoginScreen");
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
        Registro
      </Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor="#999"
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={name}
        onChangeText={setName}
      />

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
        secureTextEntry
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        className="bg-[#181818] text-white px-4 py-3 rounded-xl mb-4"
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity
        onPress={handleRegister}
        className="bg-[#FA0501] py-4 rounded-full mt-4"
      >
        <Text className="text-white text-center text-lg font-semibold">
          Registrar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
