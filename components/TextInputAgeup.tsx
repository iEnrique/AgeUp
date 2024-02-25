import {
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  View,
  TextInputSubmitEditingEventData,
} from "react-native";
import { Controller } from "react-hook-form";

interface Props {
  style?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions | undefined;
  value?: string | undefined;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  placeholder?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  secureTextEntry?: boolean | undefined;
  onPressIn?: ((e: NativeSyntheticEvent<NativeTouchEvent>) => void) | undefined;
  onSubmitEditing?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void) | undefined;
  editable?: boolean | undefined;
  selectTextOnFocus?: boolean | undefined;
  rules?: any;
  control?: any;
  name?: string;
}

export default function TextInputAgeup(props: Props) {
  if (props.control == null || props.name == null) {
    return (
      <TextInput
        style={[styles.TextInputAgeup, props.style]}
        keyboardType={props.keyboardType}
        value={props.value}
        autoCapitalize={props.autoCapitalize}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        onPressIn={props.onPressIn}
        onSubmitEditing={props.onSubmitEditing}
        editable={props.editable}
        selectTextOnFocus={props.selectTextOnFocus}
        secureTextEntry={props.secureTextEntry}
        placeholderTextColor={"#888"}
      ></TextInput>
    );
  }
  return (
    <Controller
      control={props.control}
      name={props.name}
      defaultValue={props.value}
      rules={props.rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={{ width: "100%" }}>
          <TextInput
            style={[
              styles.TextInputAgeup,
              { borderColor: error ? "red" : "#6fa8dc" },
              props.style,
            ]}
            keyboardType={props.keyboardType}
            value={value && value.toString()}
            autoCapitalize={props.autoCapitalize}
            placeholder={props.placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            onPressIn={props.onPressIn}
            onSubmitEditing={props.onSubmitEditing}
            editable={props.editable}
            selectTextOnFocus={props.selectTextOnFocus}
            secureTextEntry={props.secureTextEntry}
            placeholderTextColor={"#888"}
          ></TextInput>
          {error && (
            <Text style={styles.error}>{error?.message || "Error"}</Text>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  TextInputAgeup: {
    paddingHorizontal: 35,
    paddingVertical: 15,
    fontSize: 18,
    backgroundColor: "#EEE",
    width: "100%",
    borderRadius: 8,
    color: "#000",
    borderWidth: 4,
    borderColor: "#6fa8dc",
  },
  error: {
    color: "red",
    textAlign: "left",
    textShadowColor: "rgba(255,255,255,0.5)",
    textShadowOffset: { height: 0, width: 0 },
    textShadowRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});
