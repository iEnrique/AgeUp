import { Subtitle } from "@/components/Subtitle";
import { View } from "@/components/Themed";
import { Title } from "@/components/Title";
import { Link, router } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, useColorScheme } from "react-native";

export default function Lesson() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.containerLesson}>
          <Pressable onPress={() => router.push("/lecture/63")}               style={[
                styles.buttonLesson,
                { backgroundColor: "#6AA84F", shadowColor: "#38761d" },
              ]}>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  containerLesson: {
    width: "100%",
    padding: 30,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonLesson: {
    width: "28%",
    maxWidth: 150,
    maxHeight: 145,
    aspectRatio: 1 / 0.95,
    borderRadius: 1000,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});
