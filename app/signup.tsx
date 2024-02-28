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
  TypesSchemaSignUpWithCredential,
  schemaSignUp,
  schemaSignUpWithCredential,
} from "@/utilities/validations/signup";

import DatePicker from "react-native-date-picker";

import { RadialGradient } from "react-native-gradients";
import {
  httpSignUpWithCredential,
  httpSignUpWithEmailAndPassword,
} from "@/utilities/http/auth";
import { useLocalSearchParams } from "expo-router";
import { firebaseAuth } from "@/firebaseConfig";
import { useSession } from "@/utilities/context/authContext";
import GenderPicker from "@/components/GenderPicker";
import { i18n } from "@/utilities/i18n/i18n.config";

export default function SignUp() {
  const { isCredential } = useLocalSearchParams();
  const credential: boolean =
    parseInt(isCredential as string) == 1 ? true : false;

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    clearErrors,
    formState,
  } = useForm({
    resolver: yupResolver(
      credential ? schemaSignUpWithCredential : schemaSignUp
    ),
  });

  const { signIn, signOut } = useSession();

  const { height, width } = Dimensions.get("window");

  const [step, setStep] = useState(0);
  const [gender, setGender] = useState(0);
  const birthday = watch("birthday");
  const name = watch("name");
  const [loading, setLoading] = useState(false);

  //REMOVE WHEN LAUNCHING THE APP
  useEffect(() => {
    setValue("birthday", new Date());
  }, [setValue]);

  //NOT REMOVE THIS
  useEffect(() => {
    setValue("gender", gender);
  }, [gender]);

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

  function createUsernameAndPasswordWithCredential() {
    const email = firebaseAuth.currentUser?.email;
    if (email == null) {
      signOut();
    } else {
      const name =
        firebaseAuth.currentUser?.displayName != null
          ? firebaseAuth.currentUser.displayName.toLowerCase()
          : "user";
      const random = Math.floor(Math.random() * (9999999 - 1 + 1)) + 1;
      setValue("username", name + random);
      setValue("email", email);
    }
  }

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
          <Title color="#1F1F1F" text={"Sign up"}></Title>
          {step == 0 && (
            <StepGender
              control={control}
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
              credential={credential}
              createUsernameAndPasswordWithCredential={
                createUsernameAndPasswordWithCredential
              }
              handleSubmit={handleSubmit}
              signIn={signIn}
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
              signIn={signIn}
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
  stepsContainer: {
    width: 350,
    rowGap: 20,
    flexDirection: "column",
  },
});

interface PropsStepGender {
  control: Control<any>;
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
      <Controller
        control={props.control}
        name="gender"
        defaultValue={0}
        render={({ field, fieldState }) => {
          return (
            <GenderPicker setGender={props.setGender} gender={props.gender}></GenderPicker>
          );
        }}
      />
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
  credential: boolean;
  createUsernameAndPasswordWithCredential: Function;
  handleSubmit: UseFormHandleSubmit<TypesSchemaSignUpWithCredential>;
  signIn: Function;
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
          placeholder={i18n.t('name')}
          control={props.control}
          name="name"
        ></TextInputAgeup>
        <Controller
          control={props.control}
          name="birthday"
          render={({ field, fieldState }) => {
            return (
              <>
                <TextInputAgeup
                  placeholder="Date of birth"
                  name={i18n.t('birthday')}
                  editable={false}
                  selectTextOnFocus={false}
                  control={props.control}
                />
                <DatePicker
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
                ></DatePicker>
              </>
            );
          }}
        />
      </View>
      {props.credential ? (
        <ButtonAgeup
          type="success"
          title={i18n.t('signup')}
          onPress={() => {
            props.createUsernameAndPasswordWithCredential();

            props.handleSubmit(async (data) => {
              httpSignUpWithCredential(props.signIn, data);
            })();
          }}
        ></ButtonAgeup>
      ) : (
        <ButtonAgeup
          type="success"
          title={i18n.t('next-step')}
          onPress={() => {
            props.setStep(2);
          }}
        ></ButtonAgeup>
      )}
      <ButtonAgeup
        type="default"
        title={i18n.t('return')}
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
          placeholder={i18n.t('username')}
          name="username"
          control={props.control}
        ></TextInputAgeup>
        <TextInputAgeup
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder={i18n.t('password')}
          name="password"
          control={props.control}
        ></TextInputAgeup>
        <TextInputAgeup
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder={i18n.t('password-repeat')}
          control={props.control}
          name="passwordRepeat"
        ></TextInputAgeup>
      </View>
      <ButtonAgeup
        type="success"
        title={i18n.t('next-step')}
        onPress={() => props.setStep(3)}
      ></ButtonAgeup>
      <ButtonAgeup
        type="default"
        title={i18n.t('return')}
        onPress={() => props.setStep(1)}
      ></ButtonAgeup>
    </>
  );
}

interface PropsStepsEmail {
  control: Control<any>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleSubmit: UseFormHandleSubmit<any>;
  signIn: Function;
}

function StepEmail(props: PropsStepsEmail) {
  return (
    <>
      <View style={styles.stepsContainer}>
        <Text style={{ fontSize: 17, textAlign: "center" }}>Last step!</Text>
        <TextInputAgeup
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder={i18n.t('email')}
          name="email"
          control={props.control}
        ></TextInputAgeup>
      </View>
      <ButtonAgeup
        type="success"
        title={i18n.t('next-step')}
        onPress={props.handleSubmit(async (data) => {
          try {
            httpSignUpWithEmailAndPassword(props.signIn, data);
          } catch (error) {
            console.log(error);
          }
        })}
      />
      <ButtonAgeup
        type="default"
        title={i18n.t('return')}
        onPress={() => props.setStep(2)}
      />
    </>
  );
}
