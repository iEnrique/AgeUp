import { StyleProp, StyleSheet, Text, TextStyle, useColorScheme } from "react-native";

interface Props {
    text: String,
    style?: StyleProp<TextStyle>,
}

export function Title(props: Props) {
  const colorScheme = useColorScheme();

  return (<Text style={[styles.title, {color: colorScheme == 'dark' ? '#fff' : '#000'}, props.style]}>{props.text}</Text>);
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    paddingHorizontal: 30,
    color: "#000"
  },
});
