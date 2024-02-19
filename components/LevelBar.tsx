import { View } from "react-native";

export default function LevelBar() {
  return (
    <View style={{ width: "100%", backgroundColor: "#DDD", padding: 10, borderRadius: 30 }}>
      <View style={{width: "50%", backgroundColor: "#5cad4b", borderWidth: 4, borderColor: "#FFF", borderRadius: 15, height: 25}}></View>
    </View>
  );
}
