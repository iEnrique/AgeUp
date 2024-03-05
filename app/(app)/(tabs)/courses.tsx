import {
    createNativeStackNavigator,
    NativeStackScreenProps,
  } from "@react-navigation/native-stack";

  import {
    Dimensions,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
  } from "react-native";

  import { Text, View } from "@/components/Themed";
  import { CourseThumbnail } from "@/components/ThumbnailCourse";
  import { useEffect, useLayoutEffect, useState } from "react";
  import { i18n } from "@/utilities/i18n/i18n.config";

  const Stack = createNativeStackNavigator();

  export function Courses() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={styles.container}
        >
          <Text>Courses</Text>
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minWidth: '100%', //Not remove, important when search result is only one item
      display: 'flex',
      alignContent: "center",
      justifyContent: "flex-start",
    },

  });

  export default function CoursesStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTransparent: Platform.OS === "ios",
          headerBlurEffect: "systemThickMaterial",
        }}
      >
        <Stack.Screen
          name={i18n.t('courses')}
          component={Courses}
          options={{ headerLargeTitle: true }}
        />
      </Stack.Navigator>
    );
  }
