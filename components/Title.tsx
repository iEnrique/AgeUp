import { StyleProp, StyleSheet, Text, TextStyle, useColorScheme } from "react-native";

interface Props {
    text: String,
    style?: StyleProp<TextStyle>,
    color?: string,
}

export function Title(props: Props) {
  const colorScheme = useColorScheme();

  return (<Text style={[styles.title, {color: props.color ? props.color : colorScheme == 'dark' ? '#fff' : '#000'}, props.style]}>{props.text}</Text>);
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 30,
    color: "#000"
  },
});
