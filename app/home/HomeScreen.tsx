import { Stack, Link } from "expo-router";
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  PanResponder,
  Animated,
} from "react-native";
import {
  AntDesign,
  MaterialIcons,
  Entypo,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { useMusic, Song } from "@/components/ui/MusicProvider";

export default function HomeScreen() {
  const {
    currentSong,
    playSong,
    togglePlayPause,
    isPlaying,
    nextSong,
    prevSong,
    positionMillis,
    durationMillis,
    seekTo,
    songs,
  } = useMusic();

  const [showSelection, setShowSelection] = useState(false);
  const [activeTab, setActiveTab] = useState<"letra" | "siguiente">("letra");
  const [barLayout, setBarLayout] = useState({ width: 0, x: 0 });

  const progressWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (durationMillis > 0) {
      const percentage = (positionMillis / durationMillis) * 100;
      Animated.timing(progressWidth, {
        toValue: percentage,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
  }, [positionMillis, durationMillis]);

  const handlePlaySong = async (song: Song) => {
    await playSong(song);
    setShowSelection(false);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const nextIndex = currentSong
    ? (songs.findIndex((s) => s.id === currentSong.id) + 1) % songs.length
    : 0;
  const next = songs[nextIndex];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const touchX = evt.nativeEvent.locationX;
        const newPosition = (touchX / barLayout.width) * durationMillis;
        seekTo(newPosition);
      },
      onPanResponderMove: (evt, gestureState) => {
        const touchX = gestureState.moveX - barLayout.x;
        const newPosition =
          Math.min(Math.max(touchX / barLayout.width, 0), 1) * durationMillis;
        seekTo(newPosition);
      },
    })
  ).current;

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="flex-1 bg-[#0b0b0b]">

        {/* 🔴 BOTÓN DE PERFIL ARRIBA A LA DERECHA */}
        <View className="absolute top-10 right-6 z-50">
          <Link href="/home/ProfileScreen" asChild>
            <TouchableOpacity className="bg-[#FA0501] p-2 rounded-full">
              <Ionicons name="person" size={24} color="white" />
            </TouchableOpacity>
          </Link>
        </View>

        {(showSelection || !currentSong) ? (
          <View className="flex-1 px-6 pt-14">
            <Text className="text-white text-3xl font-bold mb-6 text-center">
              MyKast
            </Text>

            <FlatList
              data={songs}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handlePlaySong(item)}
                  className="mb-6 bg-[#181818] rounded-2xl p-4 flex-row items-center space-x-4 border border-[#2c2c2c]"
                >
                  <Image
                    source={item.image}
                    style={{ width: 64, height: 64, borderRadius: 12 }}
                  />
                  <View>
                    <Text className="text-white text-lg font-semibold">
                      {item.title}
                    </Text>
                    <Text className="text-gray-400 text-sm">{item.artist}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View className="flex-1 justify-center items-center px-6">
            <TouchableOpacity
              onPress={() => setShowSelection(true)}
              className="absolute top-12 left-6 bg-white/10 rounded-full p-3"
            >
              <Ionicons name="arrow-back" size={26} color="#fff" />
            </TouchableOpacity>

            <Image
              source={currentSong.image}
              style={{
                width: 280,
                height: 280,
                borderRadius: 24,
                marginBottom: 24,
              }}
              resizeMode="cover"
            />
            <Text className="text-white text-2xl font-bold text-center">
              {currentSong.title}
            </Text>
            <Text className="text-gray-400 text-base mt-1">
              {currentSong.artist}
            </Text>

            {/* Barra de progreso */}
            <View className="w-full mt-8">
              <View className="flex-row justify-between mb-1">
                <Text className="text-gray-400 text-xs">
                  {formatTime(positionMillis)}
                </Text>
                <Text className="text-gray-400 text-xs">
                  {formatTime(durationMillis)}
                </Text>
              </View>
              <View
                onLayout={(e) => {
                  const { width, x } = e.nativeEvent.layout;
                  setBarLayout({ width, x });
                }}
                {...panResponder.panHandlers}
                className="h-2 bg-gray-700 rounded-full overflow-hidden"
              >
                <Animated.View
                  className="h-2 bg-[#FA0501]"
                  style={{
                    width: progressWidth.interpolate({
                      inputRange: [0, 100],
                      outputRange: ["0%", "100%"],
                    }),
                  }}
                />
              </View>
            </View>

            {/* Controles */}
            <View className="flex-row items-center justify-center w-full mt-8 space-x-12">
              <TouchableOpacity onPress={prevSong} className="p-4">
                <Entypo
                  name="controller-fast-backward"
                  size={30}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={togglePlayPause}
                className="bg-[#FA0501] p-6 rounded-full shadow-xl"
              >
                <FontAwesome
                  name={isPlaying ? "pause" : "play"}
                  size={26}
                  color="#fff"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={nextSong} className="p-4">
                <Entypo name="controller-next" size={30} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Tabs: Letra / Siguiente */}
            <View className="flex-row justify-around w-full mt-10 border-b border-[#333] pb-2">
              <TouchableOpacity onPress={() => setActiveTab("letra")}>
                <Text
                  className={`text-lg ${
                    activeTab === "letra"
                      ? "text-[#FA0501]"
                      : "text-gray-400"
                  }`}
                >
                  Letra
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab("siguiente")}>
                <Text
                  className={`text-lg ${
                    activeTab === "siguiente"
                      ? "text-[#FA0501]"
                      : "text-gray-400"
                  }`}
                >
                  Siguiente
                </Text>
              </TouchableOpacity>
            </View>

            {activeTab === "letra" ? (
              <ScrollView className="mt-4 w-full max-h-52">
                <Text className="text-gray-300 text-center leading-6 whitespace-pre-line">
                  {currentSong.lyrics || "Letra no disponible."}
                </Text>
              </ScrollView>
            ) : (
              <TouchableOpacity
                onPress={() => handlePlaySong(next)}
                className="mt-6 flex-row items-center bg-[#181818] p-3 rounded-xl border border-[#333]"
              >
                <Image
                  source={next.image}
                  style={{ width: 60, height: 60, borderRadius: 12 }}
                />
                <View className="ml-3">
                  <Text className="text-white font-semibold">
                    {next.title}
                  </Text>
                  <Text className="text-gray-400 text-sm">{next.artist}</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Panel inferior */}
        <View className="bg-[#181818] border-t border-[#333] p-4 flex-row items-center justify-around">
          <TouchableOpacity className="items-center">
            <AntDesign name="home" size={26} color="#FA0501" />
            <Text className="text-[#FA0501] text-xs mt-1">Inicio</Text>
          </TouchableOpacity>

          <Link href="/home/SettingsScreen" asChild>
            <TouchableOpacity className="items-center">
              <MaterialIcons name="settings" size={26} color="#9CA3AF" />
              <Text className="text-gray-400 text-xs mt-1">Ajustes</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </>
  );
}
