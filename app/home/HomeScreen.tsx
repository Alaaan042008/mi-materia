// app/home/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import "@/global.css";
import { PokedexSearchBar } from "@/components/ui/Pokedex";

export default function HomeScreen() {
  const { id } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  // 🔸 Mapa de tipos → emojis
  const typeToEmoji = (type: string) => {
    const map: Record<string, string> = {
      normal: "⚪",
      fire: "🔥",
      water: "💧",
      electric: "⚡",
      grass: "🍃",
      ice: "❄️",
      fighting: "🥊",
      poison: "☠️",
      ground: "🌍",
      flying: "🕊️",
      psychic: "🔮",
      bug: "🐛",
      rock: "🪨",
      ghost: "👻",
      dragon: "🐉",
      dark: "🌑",
      steel: "⚙️",
      fairy: "✨",
    };
    return map[type] || "❓";
  };

  const fetchPokemon = async (pokemonId: string | number) => {
    try {
      setLoading(true);
      const idStr = String(pokemonId).toLowerCase();
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${idStr}`);
      if (!response.ok) throw new Error("No encontrado");
      const data = await response.json();
      setPokemon(data);
      Keyboard.dismiss();
    } catch (error) {
      console.error("Error al obtener el Pokémon:", error);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      const idParam = Array.isArray(id) ? id[0] : id;
      fetchPokemon(idParam);
    }
  }, [id]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") fetchPokemon(searchTerm.trim());
  };

  return (
    <>
      {/* Ocultar header */}
      <Stack.Screen options={{ headerShown: false }} />

      <ScrollView className="flex-1 bg-black px-6 pt-10">
        <TouchableOpacity onPress={() => router.back()} className="mb-4">
          <Text className="text-[#FFCB05] font-bold text-lg">← Volver</Text>
        </TouchableOpacity>

        {/* 🔍 Barra de búsqueda */}
        <PokedexSearchBar value={searchTerm} onChange={setSearchTerm} onSearch={handleSearch} />

        {loading && (
          <View className="flex-1 justify-center items-center mt-20">
            <ActivityIndicator size="large" color="#FFCB05" />
          </View>
        )}

        {!loading && pokemon ? (
          <View className="items-center">
            <Image
              source={{ uri: pokemon.sprites.other["official-artwork"].front_default }}
              className="w-60 h-60 mb-4"
              resizeMode="contain"
            />
            <Text className="text-white text-4xl font-extrabold capitalize mb-2">
              {pokemon.name}
            </Text>
            <Text className="text-gray-300 text-lg mb-4">#{pokemon.id}</Text>

            <View className="bg-white/10 rounded-2xl p-6 w-full border border-gray-700">
              <Text className="text-white text-xl font-semibold mb-2">Detalles</Text>
              <Text className="text-gray-300">
                Tipo:{" "}
                {pokemon.types
                  .map((t: any) => `${typeToEmoji(t.type.name)} ${t.type.name}`)
                  .join("  ")}
              </Text>
              <Text className="text-gray-300">Altura: {pokemon.height / 10} m</Text>
              <Text className="text-gray-300">Peso: {pokemon.weight / 10} kg</Text>
            </View>

            <View className="bg-white/10 rounded-2xl p-6 w-full border border-gray-700 mt-4">
              <Text className="text-white text-xl font-semibold mb-2">Habilidades</Text>
              {pokemon.abilities.map((a: any, index: number) => (
                <Text key={index} className="text-gray-300 capitalize">
                  • {a.ability.name}
                </Text>
              ))}
            </View>
          </View>
        ) : (
          !loading && (
            <Text className="text-gray-500 text-center mt-20">
              Busca un Pokémon por nombre o número.
            </Text>
          )
        )}
      </ScrollView>
    </>
  );
}
