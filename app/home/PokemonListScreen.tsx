import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import "@/global.css";

export default function PokemonListScreen() {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Obtener todos los Pokémon
  const fetchAllPokemon = async () => {
    try {
      setLoading(true);

      // Se obtienen los primeros 1025 Pokémon (hasta Gen 9)
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");
      const data = await response.json();

      // Añadimos imágenes a cada Pokémon
      const formattedList = data.results.map((p: any, index: number) => ({
        id: index + 1,
        name: p.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
      }));

      setPokemonList(formattedList);
    } catch (error) {
      console.error("Error al obtener los Pokémon:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPokemon();
  }, []);

  const handleSelectPokemon = (id: number) => {
    router.push({
      pathname: "/home/HomeScreen",
      params: { id },
    });
  };

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <View className="flex-1 bg-black pt-10">
      <Text className="text-white text-4xl font-extrabold text-center mb-4">
        Pokédex
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#FFCB05" />
      ) : (
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: "space-around" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectPokemon(item.id)}
              className="bg-white/10 rounded-2xl p-3 m-2 items-center w-[30%] border border-gray-700"
            >
              <Image
                source={{ uri: item.image }}
                className="w-16 h-16 mb-2"
                resizeMode="contain"
              />
              <Text className="text-white capitalize font-semibold text-center">
                {item.name}
              </Text>
              <Text className="text-gray-400 text-xs">#{item.id}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
    </>
  );
}
