import ButtonAgeup from "@/components/ButtonAgeup";
import { Label } from "@/components/Label";
import TextInputAgeup from "@/components/TextInputAgeup";
import { View } from "@/components/Themed";
import { useSession } from "@/utilities/context/authContext";
import { httpSettingPassword, httpSettings } from "@/utilities/http/settings";
import { i18n } from "@/utilities/i18n/i18n.config";
import { schemaAccount, schemaPassword } from "@/utilities/validations/settings";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";

export default function SettingsPassword() {
  const { user, updateUser } = useSession();

  const {
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schemaPassword),
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.topContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerGroup}>
        <Label>{i18n.t('new-password')}</Label>
        <TextInputAgeup
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder={i18n.t('new-password')}
          name="password"
          control={control}
        ></TextInputAgeup>
          <TextInputAgeup
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder={i18n.t('new-password-repeat')}
          name="passwordRepeat"
          control={control}
        ></TextInputAgeup>
        <Label>{i18n.t('old-password')}</Label>
        <TextInputAgeup
          keyboardType="default"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder={i18n.t('old-password')}
          name="oldPassword"
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
                await httpSettingPassword(data);
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
