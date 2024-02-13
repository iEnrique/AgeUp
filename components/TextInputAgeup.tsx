import { TextInput, StyleSheet, KeyboardTypeOptions, StyleProp, TextStyle, NativeSyntheticEvent, NativeTouchEvent } from "react-native";

interface Props {
    style?: StyleProp<TextStyle>
  keyboardType?: KeyboardTypeOptions | undefined;
  value?: string | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  placeholder?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  secureTextEntry?: boolean | undefined;
  onPressIn?: ((e: NativeSyntheticEvent<NativeTouchEvent>) => void) | undefined
  editable?: boolean | undefined,
  selectTextOnFocus?: boolean | undefined
}

export default function TextInputAgeup(props: Props) {
  return (
    <TextInput
      style={[styles.TextInputAgeup, props.style]}
      keyboardType={props.keyboardType}
      value={props.value}
      autoCapitalize={props.autoCapitalize}
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      onPressIn={props.onPressIn}
      editable={props.editable}
      selectTextOnFocus={props.selectTextOnFocus}
      secureTextEntry={props.secureTextEntry}
      placeholderTextColor={"#888"}
    ></TextInput>
  );
}

const styles = StyleSheet.create({
  TextInputAgeup: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    fontSize: 18,
    backgroundColor: "#EEE",
    width: '100%',
    borderRadius: 8,
    color: '#000',
    borderWidth: 4,
    borderColor: "#6fa8dc"
  },
});
