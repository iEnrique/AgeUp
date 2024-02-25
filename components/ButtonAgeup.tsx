import { shadeColor } from "@/utilities/hooks/useShadeColor";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  type: "default" | "success" | "danger";
  style?: any;
  onPress?: () => void;
  isLoading?: boolean;
}

export default function ButtonAgeup(props: Props) {
  var buttonTypeStyle = "#EEE";
  var textTypeStyle = "#1F1F1F";

  switch (props.type) {
    case "default":
      buttonTypeStyle = "#EEEEEE";
      textTypeStyle = "#1F1F1F";
      break;
    case "success":
      buttonTypeStyle = '#6AA84F';
      textTypeStyle = "#FFF";
      break;
    case "danger":
      buttonTypeStyle = '#d61717';
      textTypeStyle = "#FFF";
      break;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {backgroundColor: buttonTypeStyle},
        {borderColor: shadeColor(buttonTypeStyle, -20)},
        {opacity: props.isLoading ? 0.5 : 1},
        pressed || props.isLoading && styles.buttonPressed,
        props.style,
      ]}
      onPress={props.onPress}
    >
      <Text style={[styles.textButton, {color: textTypeStyle}]}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    backgroundColor: "#6AA84F",
    borderColor: "#38761d",
    borderBottomWidth: 8,
    width: "100%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
  },
  buttonPressed: {
    marginTop: 5,
    borderBottomWidth: 3,
  },
  textButton: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  defaultButton: {
    backgroundColor: "#EEE",
    borderColor: "#BBB",
  },
  successButton: {
    backgroundColor: "#6AA84F",
    borderColor: "#38761d",
  },
});
