import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  title: string;
  style?: any;
  onPress?: () => void;
}

export default function ButtonAgeup(props: Props) {
  return (
    <Pressable style={[styles.button, props.style]} onPress={props.onPress}>
      <Text style={styles.textButton}>{props.title}</Text>
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
  },
  textButton: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
