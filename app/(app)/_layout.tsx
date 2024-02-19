import { useSession } from "@/utilities/context/authContext";
import { Redirect, Stack, router } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

import { Text, View, useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/firebaseConfig";

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const { session, signIn, signOut, isLoading, user } = useSession();
  const [isAuthLoading, setAuthLoading] = useState(user);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (userAuth) => {
      if (userAuth) {
        signIn(userAuth.uid);
      }else{
        signOut();
      }
    });
  }, [onAuthStateChanged]);

  if (!isAuthLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/auth" />;
  } else {
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
