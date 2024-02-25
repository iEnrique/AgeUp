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
import { set } from "react-hook-form";
import AuthScreen from "../auth";

export default function AppLayout() {
  const colorScheme = useColorScheme();
  const { session, signIn, signOut, isLoading, user } = useSession();
  const [auth, setAuth] = useState("loading");

  useEffect(() => {
    try {
    onAuthStateChanged(firebaseAuth, (userAuth) => {
      if (userAuth) {
        console.log("ce: "+userAuth.uid);
        signIn(userAuth.uid).then((response) => {
          if(response == 200){
            setAuth("logged");
          }else if(response == 300){
            setAuth("auth");
          }
        });
      }else{
        setAuth("auth")
      }
    });
  } catch (error) {
    console.log(error);
  }
  }, [onAuthStateChanged]);

  if (auth == "auth") {
    return <AuthScreen></AuthScreen>;
  } else if(auth == "logged" && user) {

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
            <Stack.Screen name="modal" options={{ title: 'Account', presentation: "modal" }} />
            <Stack.Screen name="settings/account" options={{ title: 'Account', presentation: "modal" }} />
            <Stack.Screen name="settings/feedback" options={{ title: 'Feedback', presentation: "modal" }} />
            <Stack.Screen name="settings/profile" options={{ title: 'Profile', presentation: "modal" }} />
          </Stack>
        </View>
      </ThemeProvider>
    );
  }else{
    return <Text>Loading...</Text>;
  }
}
