import { Link, router } from "expo-router";
import {
  Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import * as AppleAuthentication from "expo-apple-authentication";
import { OAuthProvider, signInWithCredential } from "firebase/auth";
import { firebaseAuth } from "@/firebaseConfig";
import { useSession } from "@/utilities/context/authContext";
import { signInWithApple } from "@/utilities/http/auth";
import { ReactNode, useEffect, useState } from "react";
import { i18n } from "@/utilities/i18n/i18n.config";

export default function AuthScreen() {
  const backgroundMovement = new Animated.Value(0);
  const [AppleLoginState, setAppleLoginState] = useState(<View></View>);

  Animated.sequence([
    Animated.delay(0),
    Animated.timing(backgroundMovement, {
      toValue: -50,
      duration: 40000,
      easing: Easing.linear,
      useNativeDriver: false,
    }),
  ]).start();

  const { signIn } = useSession();

  async function AppleLoginRender(){
    const response = await AppleAuthentication.isAvailableAsync();

      response && setAppleLoginState(<AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={100}
      style={[styles.buttonApple]}
      onPress={async () => {
        await signInWithApple(signIn);
      }}
    />);
  }

  AppleLoginRender()

  return (
    <>
      <Animated.View
        style={[
          styles.backgroundContainer,
          {
            left: backgroundMovement.interpolate({
              inputRange: [0, 50],
              outputRange: ["0%", "50%"],
            }),
          },
        ]}
      >
        <ImageBackground
          source={require("../assets/images/auth-background.png")}
          style={styles.background}
        ></ImageBackground>
      </Animated.View>
      <Image
        style={styles.squirrel}
        source={require("@/assets/images/squirrel-auth.png")}
      />
      <View style={styles.container}>
        <View style={{flexDirection: 'row', width: '100%', columnGap: 10}}>
        <Link
          href="/signin"
          style={[
            styles.button,
            { backgroundColor: "#6AA84F", shadowColor: "#38761d", flex: 2, },
          ]}
          asChild
        >
          <Pressable>
            <Text style={styles.signin}>{i18n.t('login')}</Text>
          </Pressable>
        </Link>
        <Link
          href="/signup"
          style={[styles.button, { backgroundColor: "#b99510", shadowColor: '#866c0d', flex: 2 }]}
          asChild
        >
          <Pressable>
            <Text style={styles.signup}>{i18n.t('signup')}</Text>
          </Pressable>
        </Link></View>
        { AppleLoginState }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    bottom: 0,
    flex: 1,
    height: "100%",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "150%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 30,
    justifyContent: "flex-end",
    position: "absolute",
    zIndex: 1000,
  },

  squirrel: {
    position: "absolute",
    zIndex: 10,
    width: 350,
    height: 350,
    //transform: "rotate(-50deg)",
    transform: [{ rotate: "-50deg" }],
    right: "-33%",
    top: "15%",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: "100%",
    borderRadius: 1000,
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#FFF",
    borderWidth: 4,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  buttonApple: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    width: "100%",
    borderRadius: 1000,
    marginBottom: 20,
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#FFF",
    borderWidth: 8,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  signin: {
    width: "100%",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 22,
  },
  signup: {
    width: "100%",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 22,
  },
});
