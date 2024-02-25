import ButtonAgeup from "@/components/ButtonAgeup";
import GenderPicker from "@/components/GenderPicker";
import { Label } from "@/components/Label";
import TextInputAgeup from "@/components/TextInputAgeup";
import { View } from "@/components/Themed";
import { useSession } from "@/utilities/context/authContext";
import { httpSettings } from "@/utilities/http/settings";
import { schemaProfile } from "@/utilities/validations/settings";
import { yupResolver } from "@hookform/resolvers/yup";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, Text } from "react-native";
import DatePicker from "react-native-date-picker";

export default function SettingsProfile() {
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
    resolver: yupResolver(schemaProfile),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(user!.gender);
  const birthday = watch("birthday");

  //REMOVE WHEN LAUNCHING THE APP
  useEffect(() => {
    setValue("birthday", new Date());
  }, [setValue]);

  //NOT REMOVE THIS
  useEffect(() => {
    setValue("gender", gender);
  }, [gender]);

  return (
    <View style={styles.topContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.innerGroup}>
        <Label>Name</Label>
          <TextInputAgeup
            autoCapitalize="words"
            placeholder="Name"
            value={user!.name}
            control={control}
            name="name"
          ></TextInputAgeup>
          <Label>Birthday</Label>
          <Controller
            control={control}
            name="birthday"
            render={({ field, fieldState }) => {
              return (
                <>
                  <TextInputAgeup
                    placeholder="Date of birth"
                    name="birthday"
                    editable={false}
                    selectTextOnFocus={false}
                    control={control}
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
                  <Label>Squirrel</Label>
                  <GenderPicker
                    setGender={setGender}
                    gender={gender}
                  ></GenderPicker>
                </>
              );
            }}
          />
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
