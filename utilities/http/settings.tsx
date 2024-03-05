import {
  TypesSchemaAccount,
  TypesSchemaPassword,
  TypesSchemaProfile,
} from "../validations/settings";
import { router } from "expo-router";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function httpSettings(
  uid: string,
  updateUser: Function,
  data: TypesSchemaProfile | TypesSchemaAccount
) {
  //Check if somebody has the same username
  return new Promise((resolve, reject) => {
    if (uid != null) {
      firestore().collection("users").doc(uid).set(data, { merge: true }).then(
        () => {
          updateUser(data);
          router.back();
          resolve(undefined);
        }
      );
    }
  });
}

export function httpSettingPassword(
  data: TypesSchemaPassword
) {
  return new Promise((resolve, reject) => {
    var user = auth().currentUser;

    if (user != null && user.email != null) {
      var credential = auth.EmailAuthProvider.credential(
        user.email,
        data.oldPassword
      );

      user.reauthenticateWithCredential(credential)
        .then(function () {
          user!.updatePassword(data.password)
            .then(() => {
              resolve(undefined);
            })
            .catch((error) => {
              throw Error("Error");
            });
        })
        .catch((error) => {
          throw Error("Error");
        });
    } else {
      throw Error("Error");
    }
  });
  // Prompt the user to re-provide their sign-in credentials
}
