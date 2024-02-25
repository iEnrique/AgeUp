import ButtonAgeup from "@/components/ButtonAgeup";
import GenderPicker from "@/components/GenderPicker";
import { Label } from "@/components/Label";
import TextInputAgeup from "@/components/TextInputAgeup";
import { View } from "@/components/Themed";
import { useSession } from "@/utilities/context/authContext";
import { httpSettings } from "@/utilities/http/settings";
import { i18n } from "@/utilities/i18n/i18n.config";
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
    control,
  } = useForm({
    resolver: yupResolver(schemaAccount),
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.topContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerGroup}>
        <Label>{i18n.t('username')}</Label>
        <TextInputAgeup
          autoCapitalize="none"
          placeholder={i18n.t('username')}
          value={user!.username}
          name="username"
          control={control}
        ></TextInputAgeup>
          <Label>Email</Label>
          <TextInputAgeup
          keyboardType="email-address"
          value={user!.email}
          autoCapitalize="none"
          placeholder={i18n.t('email')}
          name="email"
          control={control}
        ></TextInputAgeup>
        </View>
        <View style={styles.innerGroup}>
          <ButtonAgeup
            type="success"
            title={i18n.t('update')}
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
            title={i18n.t('return')}
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
