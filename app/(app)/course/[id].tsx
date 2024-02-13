import { Subtitle } from "@/components/Subtitle";
import { View } from "@/components/Themed";
import { ThumbnailLesson } from "@/components/ThumnailLesson";
import { Title } from "@/components/Title";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, useColorScheme } from "react-native";

export default function Course() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.containerLessons}>
          <ThumbnailLesson number={1} title={"The start of an empire"}></ThumbnailLesson>
          <ThumbnailLesson number={2} title={"The start of an empire"}></ThumbnailLesson>
          <ThumbnailLesson number={3} title={"The start of an empire"}></ThumbnailLesson>
          <ThumbnailLesson number={4} title={"The start of an empire"}></ThumbnailLesson>
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
  containerLessons:{
    width: '100%',
    padding: 30,
    rowGap: 30,
  }
});
