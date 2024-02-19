import { Image, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { CarouselCourses } from "@/components/CarouselCourses";
import { useSession } from "@/utilities/context/authContext";
import LevelBar from "@/components/LevelBar";
import { useEffect, useState } from "react";

export default function TabOneScreen() {

  const { user } = useSession();

  return (
    <View style={styles.container}>
    <ScrollView contentContainerStyle={{width:'100%'}}>
      <View style={{width:'100%', paddingBottom: 30}}>
        <View style={styles.header}>
          <View style={{ flex: 2 }}>
            <Text style={styles.welcome}>Welcome,</Text>
            <Text style={styles.name}>{user!.name}</Text>
          </View>
          <View
            style={{
              alignSelf: "center",
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../assets/images/level-1-icon.png")}
              style={styles.level}
            ></Image>
          </View>
        </View>
        <View style={{padding: 30}}>
        <LevelBar></LevelBar></View>
        <CarouselCourses title="Recomendations"></CarouselCourses>
        <CarouselCourses title="Continue"></CarouselCourses>
        <CarouselCourses title="Popular"></CarouselCourses>
      </View>
    </ScrollView></View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  welcome: {
    fontSize: 35,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginTop: 30,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 30,
    marginBottom: 20,
    color: "gray",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    width: '100%'
  },
  level: {
    height: 100,
    width: 100,
    marginTop: 20,
    marginRight: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
