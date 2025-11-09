import { Stack } from "expo-router";
import React from "react";
import { MusicProvider } from "@/components/ui/MusicProvider";

export default function RootLayout() {
  return (
    <MusicProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </MusicProvider>
  );
}
