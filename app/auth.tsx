import { Link } from "expo-router";
import {
    Animated,
  Easing,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function AuthScreen() {
    const backgroundMovement = new Animated.Value(0);

    Animated.sequence([
        Animated.delay(0),
        Animated.timing(backgroundMovement, {
          toValue: -50,
          duration: 40000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ]).start()

  return (
    <>
      <Animated.View style={[styles.backgroundContainer, {left: backgroundMovement.interpolate({ inputRange: [0, 50], outputRange: ['0%', '50%']})}]}>
        <ImageBackground
          source={require("../assets/images/auth-background.png")}
          style={styles.background}
        ></ImageBackground>
      </Animated.View>
      <Image
        style={styles.squirrel}
        source={require("@/assets/images/squirrel-auth.png")}
      />
      <View style={styles.container}>
        <Link
          href="/signin"
          style={[
            styles.button,
            { backgroundColor: "#6AA84F", shadowColor: "#38761d" },
          ]}
          asChild
        >
          <Pressable>
            <Text style={styles.signin}>Log in</Text>
          </Pressable>
        </Link>
        <Link
          href="/signup"
          style={[styles.button, { backgroundColor: "#b99510" }]}
          asChild
        >
          <Pressable>
            <Text style={styles.signup}>Sign up</Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundContainer: {
    bottom: 0,
    flex: 1,
    height: "100%",
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    width: "150%",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    padding: 30,
    justifyContent: "flex-end",
    position: "absolute",
    zIndex: 1000,
  },

  squirrel: {
    position: "absolute",
    zIndex: 10,
    width: 350,
    height: 350,
    //transform: "rotate(-50deg)",
    transform: [{rotate: "-50deg"}],
    right: "-33%",
    top: "15%",
  },
  button: {
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    width: "100%",
    borderRadius: 1000,
    marginBottom: 20,
    textAlign: "center",
    borderColor: "#FFF",
    borderWidth: 4,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  signin: {
    width: "100%",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 22,
  },
  signup: {
    width: "100%",
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 22,
  },
});
