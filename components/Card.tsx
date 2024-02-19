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

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
  onPress?: ((event?: GestureResponderEvent) => void) | null | undefined;
}

export default function Card(props: Props) {
  const colorScheme = useColorScheme();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        colorScheme == "dark" ? styles.cardDark : styles.cardLight,
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
    aspectRatio: 1,
    height: "100%",
    borderRadius: 10,
    borderBottomWidth: 8,
  },
  cardLight: {
    backgroundColor: "#EEE",
    borderColor: "#CCC"
  },
  cardDark: {
    backgroundColor: "#333",
    borderColor: "#222"
  },
  cardPressed: {
    borderBottomWidth: 7,
    marginTop: 3,
    marginBottom: -3,
  }
});
