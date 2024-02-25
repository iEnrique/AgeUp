import { View, Text, ScrollView, StyleSheet } from "react-native";
import { CourseThumbnail } from "./ThumbnailCourse";
import { Title } from "./Title";

interface Props {
  title: String;
}

export function CarouselCourses(props: Props) {
  return (
    <View>
     <Title text={props.title} style={{marginBottom: 20, marginTop: 30}}></Title>
      <View style={{ height: 210, width: "100%" }}>
        <ScrollView
          contentContainerStyle={styles.carousel}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          horizontal={true}
        >
            <CourseThumbnail
              title="Vikings"
              style={{ marginLeft: 30, maxWidth: 180 }}
              thumbnail={require('@/assets/images/topics/thumbnails/vikings-thumbnail.png')}
              color="#b78149"
            ></CourseThumbnail>
            <CourseThumbnail
              title="Anglo-saxon England"
              style={{ maxWidth: 180 }}
              thumbnail={require('@/assets/images/topics/thumbnails/anglosaxon-thumbnail.png')}
              color="#fce5cd"
            ></CourseThumbnail>
            <CourseThumbnail
              title="Vikings"
              style={{ maxWidth: 180 }}
            ></CourseThumbnail>
            <CourseThumbnail
              title="Popopo"
              style={{ maxWidth: 180 }}
            ></CourseThumbnail>
            <CourseThumbnail
              title="Papapapa"
              style={{ marginRight: 30, maxWidth: 180 }}
            ></CourseThumbnail>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carousel: {
    flexDirection: "row",
    height: 180,
    columnGap: 15
  },
});
