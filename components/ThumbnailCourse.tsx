import { Link, router } from "expo-router";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
  Text,
} from "react-native";

import Card from "./Card";
import { Label } from "./Label";

interface Props {
  title: String;
  style?: StyleProp<ViewStyle>;
  thumbnail?: ImageSourcePropType;
  color?: string,
}

export function CourseThumbnail(props: Props) {

  return (
    <View style={props.style}>
    <Card style={[styles.course]} color={props.color} onPress={() => { router.push('/course/hola'); }}>
      { props.thumbnail != null && <Image source={props.thumbnail} style={styles.thumbnail}></Image> }
    </Card>
    <Label style={{alignSelf: 'center', marginTop: 8}}>{props.title}</Label>
    </View>
  );
}

const styles = StyleSheet.create({
  course: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  thumbnail:{
    height: '100%',
    width: '100%',
  }
});
