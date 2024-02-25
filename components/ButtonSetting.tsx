import Colors from "@/constants/Colors";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Link } from "expo-router";
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, useColorScheme } from "react-native";

interface Props {
  icon: any;
  link: any,
  children?: ReactNode;
}

export default function ButtonSetting(props: Props) {
  const colorScheme = useColorScheme();

  return (
    <Link style={[styles.buttonSetting, colorScheme == 'dark' ? styles.ButtonSettingDark : styles.ButtonSettingLight]} href={props.link} asChild>
    <Pressable>
        <View style={{flexDirection: 'row'}}>
        <Ionicons
          name={props.icon}
          size={25}
          color={Colors[colorScheme ?? "light"].text}
          style={{ marginRight: 15, marginTop: -2}}
        />
      <Text style={{ fontSize: 18, fontWeight: '500', color: Colors[colorScheme ?? "light"].text}}>
        {props.children}
      </Text></View>
      <Ionicons
        name="arrow-forward"
        size={25}
        color={Colors[colorScheme ?? "light"].text}
        style={{ alignSelf: "flex-end" }}
      />
    </Pressable></Link>
  );
}

const styles = StyleSheet.create({
  buttonSetting: {
    width: "100%",
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  ButtonSettingLight: {
    backgroundColor: "#EEE",
    borderColor: "#DDD",
  },
  ButtonSettingDark: {
    backgroundColor: "#333",
    borderColor: "#222",
  }
});
