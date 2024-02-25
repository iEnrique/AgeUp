import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import { Text, View } from "@/components/Themed";
import { useSession } from "@/utilities/context/authContext";
import ButtonAgeup from "@/components/ButtonAgeup";
import { router } from "expo-router";
import ButtonSetting from "@/components/ButtonSetting";
import { Title } from "@/components/Title";
import { Subtitle } from "@/components/Subtitle";

export default function ModalScreen() {
  const { user, signOut } = useSession();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.genderContainer}>
          <Image
            style={[
              styles.genderButton,
              user!.gender == 0 ? styles.genderMan : styles.genderWoman,
            ]}
            source={require("@/assets/images/gender-radio-buttons.png")}
          />
        </View>
        <View style={{width: '100%', marginTop: 10}}>
        <Title text={user!.name} style={{alignSelf: 'center'}}></Title>
        <Subtitle text={user!.username} style={{alignSelf: 'center'}}></Subtitle></View>
        <View
          style={{
            width: "100%",
            borderRadius: 12,
            marginTop: 30,
            overflow: "hidden",
          }}
        >
          <ButtonSetting link={'/settings/profile'} icon="brush">Profile</ButtonSetting>
          <ButtonSetting link={'/settings/account'} icon="person">Account</ButtonSetting>
          <ButtonSetting link={'/settings/account'} icon="lock-closed">Password</ButtonSetting>
          <ButtonSetting link={'/settings/feedback'} icon="chatbox-ellipses">Give feedback</ButtonSetting>
        </View>
        <View style={{ marginTop: 30, width: "100%" }}>
          <ButtonAgeup
            type="danger"
            title="Log out"
            onPress={() => {
              signOut();
              router.replace("/auth");
            }}
          ></ButtonAgeup>
        </View>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 30,
  },
  genderContainer: {
    width: 130,
    height: 150,
    overflow: "hidden",
    alignSelf: "center",
  },
  genderButton: {
    width: "190%",
    height: "195%",
  },
  genderMan: {
    transform: [{ translateX: -122 }, { translateY: 2 }],
  },
  genderWoman: {
    transform: [{ translateX: 3 }, { translateY: 2 }],
  },
  buttonSetting: {
    width: "100%",
    padding: 20,
    backgroundColor: "#EEE",
    borderColor: "#DDD",
    borderBottomWidth: 2,
  },
});
