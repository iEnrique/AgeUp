import { View, useColorScheme } from "react-native";
import { Subtitle } from "./Subtitle";
import { i18n } from "@/utilities/i18n/i18n.config";

export default function LevelBar() {
  const colorScheme = useColorScheme();

  return (
    <View>
      <View
        style={{
          width: "100%",
          backgroundColor: colorScheme == "dark" ? "#333" : "#DDD",
          padding: 5,
          borderRadius: 30,
        }}
      >
        <View
          style={{
            width: "30%",
            backgroundColor: "#5cad4b",
            borderWidth: 4,
            borderColor: "#FFF",
            borderRadius: 15,
            height: 25,
          }}
        ></View>
      </View>
      <Subtitle text={i18n.t('level-1')} style={{alignSelf: 'center', marginTop: 10}}></Subtitle>
    </View>
  );
}
