// components/ui/Pokedex.tsx
import React from "react";
import { View, TextInput, TouchableOpacity, Text, Image } from "react-native";

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
}

export const PokedexSearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <View className="flex-row items-center bg-white/10 rounded-2xl p-3 border border-gray-700 mb-5">
      <TextInput
        placeholder="Buscar Pokémon (nombre o ID)"
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChange}
        className="flex-1 text-white text-base"
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={onSearch}
        className="bg-[#FFCB05] rounded-xl px-4 py-2 active:bg-yellow-400"
      >
        <Text className="font-bold text-black">Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

interface PokemonCardProps {
  name: string;
  id: number;
  image: string;
  onPress: () => void;
}

export const PokedexCard = ({ name, id, image, onPress }: PokemonCardProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white/10 rounded-2xl p-3 m-2 items-center w-[30%] border border-gray-700"
  >
    <Image source={{ uri: image }} className="w-16 h-16 mb-2" resizeMode="contain" />
    <Text className="text-white capitalize font-semibold text-center">{name}</Text>
    <Text className="text-gray-400 text-xs">#{id}</Text>
  </TouchableOpacity>
);
