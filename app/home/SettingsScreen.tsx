import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <View className="flex-1 bg-[#0b0b0b] px-6 pt-14">
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-12 left-6 bg-white/10 rounded-full p-3"
      >
        <Ionicons name="arrow-back" size={26} color="#fff" />
      </TouchableOpacity>

      <Text className="text-white text-3xl font-bold mb-10 text-center">
        Ajustes
      </Text>

      <View className="bg-[#181818] rounded-2xl p-5 border border-[#2c2c2c] mb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg">Modo oscuro</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? "#FA0501" : "#ccc"}
          />
        </View>
      </View>

      <View className="bg-[#181818] rounded-2xl p-5 border border-[#2c2c2c] mb-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white text-lg">Notificaciones</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            thumbColor={notifications ? "#FA0501" : "#ccc"}
          />
        </View>
      </View>

      <TouchableOpacity
        className="bg-[#FA0501] mt-8 rounded-full py-4"
        onPress={() => router.push("/")}
      >
        <Text className="text-center text-white text-lg font-semibold">
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}
