import {
    GestureResponderEvent,
    Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";

import * as Haptics from "expo-haptics";
import { shadeColor } from "@/utilities/hooks/useShadeColor";

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onPress?: ((event?: GestureResponderEvent) => void) | null | undefined;
  color?: string,
}

export default function Card(props: Props) {
  const colorScheme = useColorScheme();
  const colorBackground = props.color ? {backgroundColor: props.color} : null;
  const colorShadow = props.color ? {borderColor: shadeColor(props.color, -30)} : null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        colorScheme == "dark" ? styles.cardDark : styles.cardLight,
        colorBackground,
        colorShadow,
        props.onPress && pressed && styles.cardPressed,
        props.style
      ]}
      onPress={() => { if(props.onPress){ props.onPress(); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); }}}
    >
      {props.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    borderBottomWidth: 8,
  },
  cardLight: {
    backgroundColor: "#EEE",
    borderColor: "#DDD"
  },
  cardDark: {
    backgroundColor: "#333",
    borderColor: "#222"
  },
  cardPressed: {
    borderBottomWidth: 4,
    marginTop: 4,
    marginBottom: -4,
  }
});
