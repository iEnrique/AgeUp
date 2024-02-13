import { StyleProp, StyleSheet, Text, TextStyle, useColorScheme } from "react-native";

interface Props {
    text: String,
    style?: StyleProp<TextStyle>
}

export function Subtitle(props: Props) {
  const colorScheme = useColorScheme();

  return (<Text style={[styles.title, {color: colorScheme == 'dark' ? '#888' : '#aaa'}, props.style]}>{props.text}</Text>);
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingHorizontal: 30
  },
});