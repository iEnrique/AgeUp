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

interface Props {
  title: String;
  style?: StyleProp<ViewStyle>;
}

export function CourseThumbnail(props: Props) {
  const colorScheme = useColorScheme();

  function vibrateDevice() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  return (
    <View
      style={[
        styles.course,
        props.style,
        { backgroundColor: colorScheme == "dark" ? "#222" : "#DDD" },
      ]}
    >
      <Pressable android_ripple={{ color: "gray" }}>
        <Link
          push
          href={"/course/hola"}
          style={styles.course}
          onPress={vibrateDevice}
        ></Link>
      </Pressable>
    </View>
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
