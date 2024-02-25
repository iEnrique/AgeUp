import ButtonAgeup from "@/components/ButtonAgeup";
import TextInputAgeup from "@/components/TextInputAgeup";
import { Title } from "@/components/Title";
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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaSignIn } from "@/utilities/validations/signin";

import { RadialGradient } from "react-native-gradients";
import { httpSignInWithEmailAndPassword } from "@/utilities/http/auth";
import { i18n } from "@/utilities/i18n/i18n.config";

export default function SignIn() {
  const { height, width } = Dimensions.get("window");

  const { signIn, session } = useSession();

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

  function switchToSignUp() {
    if (router.canGoBack()) {
      router.back();
      setTimeout(() => {
        router.push("/signup");
      }, 300);
    } else {
      router.replace("/signup");
    }
  }

  const form = useForm();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schemaSignIn),
  });

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
          <Title color="#1F1F1F" text={i18n.t('login')}></Title>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontSize: 17 }}>Are you new to AgeUp? </Text>
            <Pressable onPress={() => switchToSignUp()}>
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>Sign up</Text>
            </Pressable>
          </View>
          <TextInputAgeup
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder={i18n.t('email')}
            name="email"
            control={control}
          ></TextInputAgeup>
          <TextInputAgeup
            keyboardType="default"
            secureTextEntry={true}
            name="password"
            autoCapitalize="none"
            placeholder={i18n.t('password')}
            control={control}
          ></TextInputAgeup>
          <ButtonAgeup
            title={i18n.t('login')}
            type="success"
            onPress={handleSubmit(async (data) => {
              httpSignInWithEmailAndPassword(
                signIn,
                data.email,
                data.password
              ).then(() => {
                router.replace("/");
              });
            })}
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
  },
});
