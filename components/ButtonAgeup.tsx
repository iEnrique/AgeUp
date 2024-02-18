import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface Props {
  title: string;
  type: "default" | "success";
  style?: any;
  onPress?: () => void;
}

export default function ButtonAgeup(props: Props) {
  var buttonTypeStyle = styles.defaultButton;
  var textTypeStyle = styles.defaultText;

  switch (props.type) {
    case "default":
      buttonTypeStyle = styles.defaultButton;
      textTypeStyle = styles.defaultText;
      break;
    case "success":
      buttonTypeStyle = styles.successButton;
      textTypeStyle = styles.successText;
      break;
  }

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        buttonTypeStyle,
        pressed && styles.buttonPressed,
        props.style,
      ]}
      onPress={props.onPress}
    >
      <Text style={[styles.textButton, textTypeStyle]}>{props.title}</Text>
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
  defaultText: {
    color: "#000",
  },
  successButton: {
    backgroundColor: "#6AA84F",
    borderColor: "#38761d",
  },
  successText: {
    color: "#FFF",
  },
});
