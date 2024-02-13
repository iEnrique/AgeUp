import { useSession } from "@/utilities/context/authContext";
import { Redirect, Stack, router } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Text, View, useColorScheme } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.

  if (!session) {
    console.log("Person is not logged in");
    return <Redirect href="/auth" />;
  }else{

  console.log("Person is logged in");
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === "dark" ? "#000" : "#FFF",
        }}
      >
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </View>
    </ThemeProvider>
  );
}
}
