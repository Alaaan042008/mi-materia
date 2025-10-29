// app/_layout.tsx
import { Stack } from "expo-router";
// ❌ borra o comenta esta línea
// import { MusicProvider } from "@/components/MusicProvider";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
