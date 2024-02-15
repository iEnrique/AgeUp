import ButtonAgeup from "@/components/ButtonAgeup";
import TextInputAgeup from "@/components/TextInputAgeup";
import { Title } from "@/components/Title";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  Dimensions,
  DimensionValue,
} from "react-native";

import {
  Control,
  Controller,
  SubmitHandler,
  UseFormHandleSubmit,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  TypesSchemaSignUp,
  schemaSignUp,
} from "@/utilities/validations/signup";

import DatePicker from "react-native-date-picker";

import { RadialGradient } from "react-native-gradients";
import { httpSignUp } from "@/utilities/http/auth";

export default function SignUp() {
  const form = useForm();
  const { handleSubmit, watch, control, setValue } = useForm({
    resolver: yupResolver(schemaSignUp),
  });

  const { height, width } = Dimensions.get("window");

  const [step, setStep] = useState(0);
  const [gender, setGender] = useState(0);
  const birthday = watch("birthday");
  const [loading, setLoading] = useState(false);

  //REMOVE WHEN LAUNCHING THE APP
  useEffect(() => {
    setValue('birthday', new Date());
  }, [setValue])

  var signupBackgroundBottom = -10 as DimensionValue;
  var widthBackgroundBottom = 300;
  var heightBackgroundBottom = 400;

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
          <Title text={"Sign up"}></Title>
          {step == 0 && (
            <StepGender
              gender={gender}
              setGender={setGender}
              setStep={setStep}
            ></StepGender>
          )}
          {step == 1 && (
            <StepNameAndBirthday
              control={control}
              setStep={setStep}
              birthday={birthday}
            ></StepNameAndBirthday>
          )}
          {step == 2 && (
            <StepUsernameAndPassword
              control={control}
              setStep={setStep}
            ></StepUsernameAndPassword>
          )}
          {step == 3 && (
            <StepEmail
              control={control}
              setStep={setStep}
              handleSubmit={handleSubmit}
            ></StepEmail>
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
    textAlign: "center",
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
  function switchToSignIn() {
    if (router.canGoBack()) {
      router.back();
      setTimeout(() => {
        router.push("/signin");
      }, 300);
    } else {
      router.replace("/signin");
    }
  }

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 17 }}>Already signed up? </Text>
        <Pressable onPress={() => switchToSignIn()}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>Log in</Text>
        </Pressable>
      </View>
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
      <ButtonAgeup
        title="Next step"
        type="success"
        onPress={() => props.setStep(1)}
      ></ButtonAgeup>
    </>
  );
}

interface PropsSteps {
  control: Control<any>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

interface PropsStepsNameaAndBirthday {
  control: Control<any>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  birthday: Date | undefined;
}

function StepNameAndBirthday(props: PropsStepsNameaAndBirthday) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <View style={styles.stepsContainer}>
        <Text style={{ fontSize: 17, textAlign: "center" }}>
          You're a step closer to joining!
        </Text>
        <TextInputAgeup
          autoCapitalize="words"
          placeholder="Name"
          control={props.control}
          name="name"
        ></TextInputAgeup>
        <Controller
    control={props.control}
    name='birthday'
    render={({ field, fieldState }) => {

        console.log(field.value);

        return <><TextInputAgeup
        placeholder="Date of birth"
        name="birthday"
        editable={false}
        selectTextOnFocus={false}
        control={props.control}
      /><DatePicker
          modal
          open={open}
          date={field.value != undefined ? field.value : new Date()}
          onConfirm={(date) => {
            field.onChange(new Date());
            setOpen(false);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        ></DatePicker></>}} />
      </View>
      <ButtonAgeup
        type="success"
        title="Next step"
        onPress={() => { props.setStep(2)} }
      ></ButtonAgeup>
      <ButtonAgeup
        type="default"
        title="Go back"
        onPress={() => props.setStep(0)}
      ></ButtonAgeup>
    </>
  );
}

function StepUsernameAndPassword(props: PropsSteps) {
  return (
    <>
      <View style={styles.stepsContainer}>
        <Text style={{ fontSize: 17, textAlign: "center" }}>
          Just a few more details...
        </Text>
        <TextInputAgeup
          autoCapitalize="none"
          placeholder="Username"
          name="username"
          control={props.control}
        ></TextInputAgeup>
        <TextInputAgeup
          keyboardType="visible-password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          name="password"
          control={props.control}
        ></TextInputAgeup>
        <TextInputAgeup
          keyboardType="visible-password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Repeat password"
          control={props.control}
          name="passwordverification"
        ></TextInputAgeup>
      </View>
      <ButtonAgeup
        type="success"
        title="Next step"
        onPress={() => props.setStep(3)}
      ></ButtonAgeup>
      <ButtonAgeup
        type="default"
        title="Go back"
        onPress={() => props.setStep(1)}
      ></ButtonAgeup>
    </>
  );
}

interface PropsStepsEmail {
  control: Control<any>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: UseFormHandleSubmit<TypesSchemaSignUp>;
}

function StepEmail(props: PropsStepsEmail) {
  return (
    <>
      <View style={styles.stepsContainer}>
        <Text style={{ fontSize: 17, textAlign: "center" }}>Last step!</Text>
        <TextInputAgeup
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          control={props.control}
        ></TextInputAgeup>
      </View>
      <ButtonAgeup
        type="success"
        title="Next step"
        onPress={props.handleSubmit(async (data: TypesSchemaSignUp) => {
          try{
            await httpSignUp(data);
            router.replace('/');
          } catch(error) {
            console.log(error);
          }
        })}
      />
      <ButtonAgeup
        type="default"
        title="Go back"
        onPress={() => props.setStep(2)}
      />
    </>
  );
}
