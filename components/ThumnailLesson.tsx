import { Link } from "expo-router";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
  useColorScheme,
} from "react-native";

import * as Haptics from "expo-haptics";
import { Title } from "./Title";
import { Subtitle } from "./Subtitle";

interface Props {
  number: number;
  title: String;
  style?: StyleProp<ViewStyle>;
}

export function ThumbnailLesson(props: Props) {
  const colorScheme = useColorScheme();

  function vibrateDevice() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  return (
    <Link
      push
      href={"/lesson/hola"}
      style={[
        styles.cardLesson,
        { backgroundColor: colorScheme == "dark" ? "#222" : "#f2f2f2",
    shadowColor: colorScheme == 'dark' ? '#111' : "#ddd" },
      ]}
      asChild
      onPress={vibrateDevice}
    >
      <Pressable>
        <Title text={"Lesson "+props.number.toString()} style={{ marginBottom: 5 }}></Title>
        <Subtitle text={props.title}></Subtitle>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardLesson: {
    padding: 20,
    borderRadius: 15,
    width: "100%",
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 1,
    shadowRadius: 0,
  },
});
