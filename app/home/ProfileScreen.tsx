import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) setUser(JSON.parse(data));
    };
    loadUser();
  }, []);

  return (
    <View className="flex-1 bg-[#0b0b0b] px-6 pt-20 items-center">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 bg-white/10 rounded-full p-3"
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Perfil
      </Text>

      {user ? (
        <View className="bg-[#181818] rounded-2xl p-6 border border-[#2c2c2c] w-full items-center">
          <Text className="text-white text-2xl font-semibold mb-2">
            {user.name}
          </Text>
          <Text className="text-gray-400">{user.email}</Text>
        </View>
      ) : (
        <Text className="text-gray-400">No se encontró información del usuario.</Text>
      )}
    </View>
  );
}
