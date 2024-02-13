import ButtonAgeup from "@/components/ButtonAgeup";
import TextInputAgeup from "@/components/TextInputAgeup";
import { useSession } from "@/utilities/context/authContext";
import { router } from "expo-router";
import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  DimensionValue,
} from "react-native";

import { RadialGradient } from "react-native-gradients";

export default function SignIn() {
  const { height, width } = Dimensions.get("window");

  const { signIn } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  var castleBottom = -40 as DimensionValue;

  if (height < 750) {
    castleBottom = -80 as DimensionValue;
  }

  const colorList = [
    { offset: "0%", color: "#FFF", opacity: "1" },
    { offset: "50%", color: "#fff2cc", opacity: "1" },
    { offset: "70%", color: "#f3e4d4", opacity: "1" },
    { offset: "100%", color: "#cbb094", opacity: "1" },
  ];

  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.gradientBg}>
          <RadialGradient
            x="50%"
            y="100%"
            rx="100%"
            ry="100%"
            colorList={colorList}
          />
        </View>
        <Image
          source={require("@/assets/images/castle-door.png")}
          style={[styles.castle, { bottom: castleBottom }]}
        />

        <View style={styles.container}>
          <TextInputAgeup
            keyboardType="email-address"
            value={email}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
          ></TextInputAgeup>
          <TextInputAgeup
            keyboardType="visible-password"
            secureTextEntry={true}
            value={password}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
          ></TextInputAgeup>
          <ButtonAgeup
            title="Log in"
            onPress={async () => {
              await signIn({
                email: email,
                password: password,
                setLoading: setLoading,
              });
              // Navigate after signing in. You may want to tweak this to ensure sign-in is
              // successful before navigating.
              router.replace("/");
            }}
          ></ButtonAgeup>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  gradientBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 30,
    rowGap: 15,
    marginTop: 10,
  },
  castle: {
    position: "absolute",
    bottom: "-5%",
    width: "150%",
    maxHeight: "55%",
    alignSelf: "center",
    resizeMode: "contain",
    aspectRatio: 1,
  }
});
