import { Image, Pressable, StyleSheet, View } from "react-native";

interface Props {
    setGender: React.Dispatch<React.SetStateAction<number>>;
    gender: number;
}

export default function GenderPicker(props: Props){
    return <View style={styles.genderContainer}>
              <Pressable
                style={styles.genderButton}
                onPress={() => {
                  props.setGender(1);
                }}
              >
                <Image
                  style={[
                    styles.genderWoman,
                    {
                      transform:
                        props.gender == 0
                          ? [{ translateX: 5 }, { translateY: -178 }]
                          : [{ translateX: 5 }, { translateY: 2 }],
                    },
                  ]}
                  source={require("@/assets/images/gender-radio-buttons.png")}
                />
              </Pressable>
              <Pressable
                style={styles.genderButton}
                onPress={() => {
                  props.setGender(0);
                }}
              >
                <Image
                  style={[
                    styles.genderMan,
                    {
                      transform:
                        props.gender == 1
                          ? [{ translateX: -150 }, { translateY: -178 }]
                          : [{ translateX: -150 }, { translateY: 2 }],
                    },
                  ]}
                  source={require("@/assets/images/gender-radio-buttons.png")}
                />
              </Pressable>
            </View>
}

const styles = StyleSheet.create({
    genderContainer: {
        width: 350,
        height: 180,
        columnGap: 30,
        flexDirection: "row",
      },
      genderButton: {
        flex: 1,
        overflow: "hidden",
      },
      genderMan: {
        width: "190%",
        height: "195%",
        transform: [{ translateX: -89 }, { translateY: 2 }],
      },
      genderWoman: {
        width: "190%",
        height: "195%",
        transform: [{ translateX: 3 }, { translateY: 2 }],
      },
});