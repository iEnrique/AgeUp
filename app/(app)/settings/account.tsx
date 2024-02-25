import ButtonAgeup from "@/components/ButtonAgeup";
import GenderPicker from "@/components/GenderPicker";
import { Label } from "@/components/Label";
import TextInputAgeup from "@/components/TextInputAgeup";
import { View } from "@/components/Themed";
import { useSession } from "@/utilities/context/authContext";
import { httpSettings } from "@/utilities/http/settings";
import { schemaAccount, schemaProfile } from "@/utilities/validations/settings";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function SettingsAccount() {
  const { user, updateUser } = useSession();

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    clearErrors,
    formState,
  } = useForm({
    resolver: yupResolver(schemaAccount),
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.topContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerGroup}>
        <Label>Username</Label>
        <TextInputAgeup
          autoCapitalize="none"
          placeholder="Username"
          value={user!.username}
          name="username"
          control={control}
        ></TextInputAgeup>
          <Label>Email</Label>
          <TextInputAgeup
          keyboardType="email-address"
          value={user!.email}
          autoCapitalize="none"
          placeholder="Email"
          name="email"
          control={control}
        ></TextInputAgeup>
        </View>
        <View style={styles.innerGroup}>
          <ButtonAgeup
            type="success"
            title="Update"
            isLoading={isLoading}
            onPress={handleSubmit(async (data) => {
              setIsLoading(true);
              try {
                await httpSettings(user!.id, updateUser, data);
                setIsLoading(false);
              } catch (error) {
                console.log(error);
              }
            })}
          />
          <ButtonAgeup
            type="default"
            title="Go back"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flex: 1,
  },
  container: {
    padding: 30,
    alignContent: "center",
    rowGap: 30,
  },
  innerGroup: {
    rowGap: 20,
  },
});
