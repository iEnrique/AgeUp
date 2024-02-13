import { ScrollView, StyleSheet, TextInput } from "react-native";

import { Text, View } from "@/components/Themed";
import { CourseThumbnail } from "@/components/ThumbnailCourse";

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
      <TextInput style={{paddingHorizontal: 25, paddingVertical:10, backgroundColor: '#dedede', width: '100%', marginBottom: 30, borderRadius: 15}} placeholder="Search..." />
        <View style={styles.coursesContainer}>
          <CourseThumbnail title="Hola" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Buenas" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Que tal" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Bien" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Bien" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Bien" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Bien" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Bien" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Bien" style={{maxWidth: '48%'}}></CourseThumbnail>
          <CourseThumbnail title="Bien" style={{maxWidth: '48%'}}></CourseThumbnail>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  coursesContainer: {
    display: "flex",
    alignContent: "flex-start",
    flexDirection: "row",
    rowGap: 10,
    columnGap: 10,
    flexWrap: "wrap",
  },
});
