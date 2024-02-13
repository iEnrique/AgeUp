import ButtonAgeup from "@/components/ButtonAgeup";
import TextInputAgeup from "@/components/TextInputAgeup";
import { useSession } from "@/utilities/context/authContext";
import { Link } from "expo-router";
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
  GestureResponderEvent,
} from "react-native";

import DatePicker from "react-native-date-picker";

import { RadialGradient } from "react-native-gradients";

export default function SignUp() {
  const { height, width } = Dimensions.get("window");

  const [step, setStep] = useState(0);
  const [gender, setGender] = useState(0);
  const [birthday, setBirthday] = useState<Date>();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  var signupBackgroundBottom = -30 as DimensionValue;
  var widthBackgroundBottom = 300;
  var heightBackgroundBottom = 600;

  if (height > 750) {
    signupBackgroundBottom = -20 as DimensionValue;
    widthBackgroundBottom = 400;
    heightBackgroundBottom = 700;
  }

  if (height > 1100) {
    signupBackgroundBottom = -10 as DimensionValue;
    widthBackgroundBottom = 500;
    heightBackgroundBottom = 800;
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
          source={
            gender == 0
              ? require("@/assets/images/signup-background-man.png")
              : require("@/assets/images/signup-background-woman.png")
          }
          style={[
            styles.signupBackground,
            {
              bottom: signupBackgroundBottom,
              width: widthBackgroundBottom,
              height: heightBackgroundBottom,
            },
          ]}
        />

        <View style={styles.container}>
          {step == 0 && (
            <StepGender
              gender={gender}
              setGender={setGender}
              setStep={setStep}
            ></StepGender>
          )}
          {step == 1 && (
            <StepBirthdayAndUsername
              birthday={birthday}
              username={username}
              setBirthday={setBirthday}
              setUsername={setUsername}
              setStep={setStep}
            ></StepBirthdayAndUsername>
          )}
          {step == 2 && (
            <StepEmailAndPassword
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              setStep={setStep}
            ></StepEmailAndPassword>
          )}
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
  signupBackground: {
    position: "absolute",
    bottom: 0,
    width: "150%",
    maxHeight: "55%",
    alignSelf: "center",
    resizeMode: "contain",
    aspectRatio: 1,
  },
  genderContainer: {
    width: 350,
    height: 180,
    columnGap: 30,
    flexDirection: "row",
  },
  stepsContainer: {
    width: 350,
    rowGap: 20,
    flexDirection: "column",
  },
  genderButton: {
    flex: 1,
    overflow: "hidden",
  },
  genderMan: {
    width: "190%",
    height: "195%",
    transform: [{ translateX: -89 }, { translateY: 2 }],
  },
  genderWoman: {
    width: "190%",
    height: "195%",
    transform: [{ translateX: 3 }, { translateY: 2 }],
  },
});

interface PropsStepGender {
  setGender: React.Dispatch<React.SetStateAction<number>>;
  gender: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function StepGender(props: PropsStepGender) {
  return (
    <>
      <Text style={{ fontSize: 17 }}>
        Do you have an account already?{" "}
        <Link href="/signin" style={{ fontWeight: "bold" }}>
          Log in
        </Link>
      </Text>
      <View style={styles.genderContainer}>
        <Pressable
          style={styles.genderButton}
          onPress={() => {
            props.setGender(1);
          }}
        >
          <Image
            style={[
              styles.genderWoman,
              {
                transform:
                  props.gender == 0
                    ? [{ translateX: 5 }, { translateY: -178 }]
                    : [{ translateX: 5 }, { translateY: 2 }],
              },
            ]}
            source={require("@/assets/images/gender-radio-buttons.png")}
          />
        </Pressable>
        <Pressable
          style={styles.genderButton}
          onPress={() => {
            props.setGender(0);
          }}
        >
          <Image
            style={[
              styles.genderMan,
              {
                transform:
                  props.gender == 1
                    ? [{ translateX: -150 }, { translateY: -178 }]
                    : [{ translateX: -150 }, { translateY: 2 }],
              },
            ]}
            source={require("@/assets/images/gender-radio-buttons.png")}
          />
        </Pressable>
      </View>
      <ButtonAgeup title="Next step" onPress={() => props.setStep(1)}></ButtonAgeup>
    </>
  );
}

interface PropsStepBirthdayAndUsername {
  setBirthday: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  birthday: Date | undefined;
  username: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function StepBirthdayAndUsername(props: PropsStepBirthdayAndUsername) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.stepsContainer}>
        <TextInputAgeup
          value={props.birthday != undefined ? props.birthday.toString() : ""}
          placeholder="Date of birth"
          onPressIn={() => setOpen(true)}
          editable={false}
          selectTextOnFocus={false}
        />
        <DatePicker
          modal
          open={open}
          date={props.birthday != undefined ? props.birthday : new Date()}
          onConfirm={(date) => {
            setOpen(false);
            props.setBirthday(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        ></DatePicker>
        <TextInputAgeup
          keyboardType="visible-password"
          secureTextEntry={true}
          value={props.username}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={(text) => props.setUsername(text)}
        ></TextInputAgeup>
      </View>
      <ButtonAgeup title="Next step" onPress={() => props.setStep(2)}></ButtonAgeup>
    </>
  );
}

interface PropsStepEmailAndPassword {
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  password: string;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function StepEmailAndPassword(props: PropsStepEmailAndPassword) {
  return (
    <>
      <View style={styles.stepsContainer}>
        <TextInputAgeup
          keyboardType="email-address"
          value={props.email}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={(text) => props.setEmail(text)}
        ></TextInputAgeup>
        <TextInputAgeup
          keyboardType="visible-password"
          secureTextEntry={true}
          value={props.password}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={(text) => props.setPassword(text)}
        ></TextInputAgeup>
        <TextInputAgeup
          keyboardType="visible-password"
          secureTextEntry={true}
          value={""}
          autoCapitalize="none"
          placeholder="Repeat password"
          onChangeText={(text) => props.setPassword(text)}
        ></TextInputAgeup>
      </View>
      <ButtonAgeup title="Next step"></ButtonAgeup>
    </>
  );
}
