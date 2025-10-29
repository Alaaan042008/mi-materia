import { View, Text, TouchableOpacity, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import "@/global.css";

export default function Index() {
  const router = useRouter();

  const entrarPokedex = () => {
    router.push("/home/PokemonListScreen");
  };

  return (
    <>
      {/* Ocultar el header del Stack */}
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex-1 bg-black items-center justify-center px-8">
        {/* 🔹 Logo Pokémon */}
        <Image
          source={{
            uri: "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png",
          }}
          className="w-48 h-48 mb-6"
          resizeMode="contain"
        />

        {/* 🔹 Texto principal */}
        <Text className="text-white text-3xl font-extrabold mb-2 text-center">
          Bienvenido a la Pokédex de Alaan
        </Text>

        <Text className="text-gray-400 text-base text-center mb-10">
          Accede a la PC de Bill para ver todos los Pokémon registrados hasta la
          Generación 9.
        </Text>

        {/* 🔹 Botón principal */}
        <TouchableOpacity
          onPress={entrarPokedex}
          className="bg-[#FA0501] px-10 py-4 rounded-2xl shadow-lg active:bg-red-700"
        >
          <Text className="text-white font-bold text-lg uppercase">
            Entrar a la PC de Bill
          </Text>
        </TouchableOpacity>

        {/* 🔹 Créditos o pie */}
        <Text className="text-gray-500 mt-16 text-sm">
          © 2025 Alaan's Pokédex
        </Text>
      </View>
    </>
  );
}
