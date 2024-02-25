import { ReactNode } from "react";
import { StyleProp, StyleSheet, Text, TextStyle, useColorScheme } from "react-native";

interface Props {
    children?: ReactNode,
    style?: StyleProp<TextStyle>
}

export function Label(props: Props) {
  const colorScheme = useColorScheme();

  return (<Text style={[styles.title, {color: colorScheme == 'dark' ? '#FFF' : '#1F1F1F'}, props.style]}>{props.children}</Text>);
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: -5,
    fontWeight: 'bold'
  },
});