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

export function TabTwoScreen({ navigation }: NativeStackScreenProps<any>) {
  const data = [
    "Rome",
    "French revolution",
    "Anglo-saxon England",
    "China",
    "Mexican revolution",
    "Free coffee",
  ];

  const [search, setSearch] = useState(data);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (text) => {
          setSearch(
            data
              ? data.filter((o) =>
                  o.toLowerCase().includes(text.nativeEvent.text.toLowerCase()))
              : data
          );
        },
      },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.container}
      >
        <View style={[styles.coursesContainer]}>
          {search.map((data) => {
            return (
              <CourseThumbnail
              key={data}
                title={data}
                style={styles.courseThumbanailSearch}
              ></CourseThumbnail>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%', //Not remove, important when search result is only one item
    display: 'flex',
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  coursesContainer: {
    display: "flex",
    alignContent: "flex-start",
    width: '100%',
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: Dimensions.get("window").width * (8 / 100),
    padding: 30,
  },
  courseThumbanailSearch: {
    width: "45%",
    aspectRatio: 1 / 1,
    marginBottom: 50,
    height: "100%",
  },
});

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: Platform.OS === "ios",
        headerBlurEffect: "systemThickMaterial",
      }}
    >
      <Stack.Screen
        name={i18n.t('all-topics')}
        component={TabTwoScreen}
        options={{ headerLargeTitle: true }}
      />
    </Stack.Navigator>
  );
}
