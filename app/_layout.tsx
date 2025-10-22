import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* 🏠 Home screen (index.tsx) */}
        <Stack.Screen
          name="index"
          options={{
            title: "Lucky Lotto",
            headerShown: false,
          }}
        />

        {/* 🎲 Number Selection screen (numberSelection.tsx) */}
        <Stack.Screen
          name="numberSelection"
          options={{
            title: "Pick Numbers",
            headerBackTitle: "Back",
            headerShown:false,
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}