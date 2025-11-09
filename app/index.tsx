import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import "@/global.css";

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0b0b0b] items-center justify-center px-8">
      <Image
        source={require("@/assets/images/78d9a14a-5646-444c-8255-c41850ae3243.png")}
      />

      <TouchableOpacity
        onPress={() => router.push("/login/LoginScreen")}
        className="bg-[#FA0501] px-10 py-4 rounded-full mb-5 w-60"
      >
        <Text className="text-white text-lg font-semibold text-center">
          Iniciar Sesión
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/login/registerScreen")}
        className="bg-[#181818] px-10 py-4 rounded-full border border-[#FA0501] w-60"
      >
        <Text className="text-white text-lg font-semibold text-center">
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
}
