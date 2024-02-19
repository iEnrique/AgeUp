import { Link, router } from "expo-router";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  useColorScheme,
} from "react-native";

import Card from "./Card";

interface Props {
  title: String;
  style?: StyleProp<ViewStyle>;
}

export function CourseThumbnail(props: Props) {
  const colorScheme = useColorScheme();

  return (
    <Card style={props.style} onPress={() => { router.push('/course/hola'); }}></Card>
  );
}

const styles = StyleSheet.create({
  course: {
    width: "100%",
    aspectRatio: 1,
    height: "100%",
    borderRadius: 10,
  },
});
